/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Prisma } from '@prisma/client';
import { TRPCError, inferAsyncReturnType } from '@trpc/server';
import { z } from 'zod';

import {
    createTRPCContext,
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from '~/server/api/trpc';

export const tweetRouter = createTRPCRouter({
    infiniteProfileFeed: publicProcedure
        .input(
            z.object({
                userId: z.string(),
                limit: z.number().optional(),
                cursor: z
                    .object({ id: z.string(), createdAt: z.date() })
                    .optional(),
            }),
        )
        .query(async ({ input: { limit = 10, userId, cursor }, ctx }) => {
            return await getInfiniteTweets({
                limit,
                ctx,
                cursor,
                whereClause: { userId },
            });
        }),
    infiniteFeed: publicProcedure
        .input(
            z.object({
                onlyFollowing: z.boolean().optional(),
                limit: z.number().optional(),
                cursor: z
                    .object({ id: z.string(), createdAt: z.date() })
                    .optional(),
            }),
        )
        .query(
            async ({
                input: { limit = 10, onlyFollowing = false, cursor },
                ctx,
            }) => {
                const currentUserId = ctx.session?.user.id;

                return await getInfiniteTweets({
                    limit,
                    ctx,
                    cursor,
                    whereClause:
                        currentUserId == null || !onlyFollowing
                            ? undefined
                            : {
                                  user: {
                                      followers: {
                                          some: { id: currentUserId },
                                      },
                                  },
                              },
                });
            },
        ),
    getTweetById: publicProcedure
        .input(
            z.object({
                id: z.string(),
            }),
        )
        .query(async ({ input, ctx }) => {
            const { id } = input;
            const currentUserId = ctx.session?.user.id;

            const tweet = await ctx.prisma.tweet.findFirst({
                where: {
                    id,
                },
                select: {
                    id: true,
                    content: true,
                    createdAt: true,
                    _count: { select: { likes: true, subTweets: true } },
                    likes:
                        currentUserId == null
                            ? false
                            : { where: { userId: currentUserId } },
                    user: {
                        select: { name: true, id: true, image: true },
                    },
                },
            });

            if (!tweet)
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: "Chosen tweet doesn't exist!",
                });

            return {
                ...tweet,
                likeCount: tweet._count.likes,
                likedByMe: tweet.likes?.length > 0,
            };
        }),
    create: protectedProcedure
        .input(z.object({ content: z.string() }))
        .mutation(async ({ input: { content }, ctx }) => {
            const tweet = await ctx.prisma.tweet.create({
                data: { content, userId: ctx.session.user.id },
            });

            void ctx.revalidateSSG?.(`/profiles/${ctx.session.user.id}`);

            return tweet;
        }),
    delete: protectedProcedure
        .input(z.object({ tweetId: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const tweetId = input.tweetId;

            const selectedTweet = await ctx.prisma.tweet.findFirst({
                where: {
                    id: tweetId,
                },
            });

            if (selectedTweet) {
                const deletedTweet = await ctx.prisma.tweet.delete({
                    where: {
                        id: tweetId,
                    },
                });

                void ctx.revalidateSSG?.(`/profiles/${ctx.session.user.id}`);

                return deletedTweet.id;
            } else {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'There is no tweet with this tweetId!',
                });
            }
        }),
    edit: protectedProcedure
        .input(z.object({ tweetId: z.string(), content: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const { tweetId, content } = input;

            const existingTweet = await ctx.prisma.tweet.update({
                where: {
                    id: tweetId,
                },
                data: {
                    content,
                },
            });

            void ctx.revalidateSSG?.(`/profiles/${ctx.session.user.id}`);

            return existingTweet;
        }),
    toggleLike: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ input: { id }, ctx }) => {
            const data = { tweetId: id, userId: ctx.session.user.id };

            const existingLike = await ctx.prisma.like.findUnique({
                where: { userId_tweetId: data },
            });

            if (existingLike == null) {
                await ctx.prisma.like.create({ data });
                return { addedLike: true };
            } else {
                await ctx.prisma.like.delete({
                    where: { userId_tweetId: data },
                });
                return { addedLike: false };
            }
        }),
    likesList: publicProcedure
        .input(
            z.object({
                tweetId: z.string(),
                cursor: z
                    .object({ userId: z.string(), tweetId: z.string() })
                    .nullish(),
                limit: z.number().min(1).max(100),
            }),
        )
        .query(async ({ input: { limit = 10, ...input }, ctx }) => {
            const { tweetId, cursor } = input;

            try {
                const likeList = await ctx.prisma.like.findMany({
                    where: {
                        tweetId,
                    },
                    take: limit + 1,
                    cursor: cursor ? { userId_tweetId: cursor } : undefined,
                    include: {
                        user: {
                            select: {
                                id: true,
                                image: true,
                                name: true,
                            },
                        },
                    },
                });

                let nextCursor: typeof cursor | undefined = undefined;
                if (likeList.length > limit) {
                    const nextItem = likeList.pop();
                    nextCursor = {
                        tweetId: (nextItem as { tweetId: string }).tweetId,
                        userId: (nextItem as { userId: string }).userId,
                    };
                }

                return {
                    likeList,
                    nextCursor,
                };
            } catch (err) {
                throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
            }
        }),
});

async function getInfiniteTweets({
    whereClause,
    ctx,
    limit,
    cursor,
}: {
    whereClause?: Prisma.TweetWhereInput;
    limit: number;
    cursor: { id: string; createdAt: Date } | undefined;
    ctx: inferAsyncReturnType<typeof createTRPCContext>;
}) {
    const currentUserId = ctx.session?.user.id;

    const data = await ctx.prisma.tweet.findMany({
        take: limit + 1,
        cursor: cursor ? { createdAt_id: cursor } : undefined,
        orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
        where: whereClause,
        select: {
            id: true,
            content: true,
            createdAt: true,
            _count: { select: { likes: true, subTweets: true } },
            likes:
                currentUserId == null
                    ? false
                    : { where: { userId: currentUserId } },
            user: {
                select: { name: true, id: true, image: true },
            },
        },
    });

    let nextCursor: typeof cursor | undefined;
    if (data.length > limit) {
        const nextItem = data.pop();
        if (nextItem != null) {
            nextCursor = { id: nextItem.id, createdAt: nextItem.createdAt };
        }
    }

    return {
        tweets: data.map((tweet) => {
            return {
                id: tweet.id,
                content: tweet.content,
                createdAt: tweet.createdAt,
                user: tweet.user,
                likeCount: tweet._count.likes,
                subTweetCount: tweet._count.subTweets,
                likedByMe: tweet.likes?.length > 0,
            };
        }),
        nextCursor,
    };
}
