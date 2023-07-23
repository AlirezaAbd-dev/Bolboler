import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from '~/server/api/trpc';

export const profileRouter = createTRPCRouter({
    getById: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input: { id }, ctx }) => {
            const currentUserId = ctx.session?.user.id;
            const profile = await ctx.prisma.user.findUnique({
                where: { id },
                select: {
                    name: true,
                    image: true,
                    _count: {
                        select: {
                            followers: true,
                            follows: true,
                            tweets: true,
                        },
                    },
                    followers:
                        currentUserId == null
                            ? undefined
                            : { where: { id: currentUserId } },
                },
            });

            if (profile === null) return;

            return {
                name: profile.name,
                image: profile.image,
                followersCount: profile._count.followers,
                followsCount: profile._count.follows,
                tweetsCount: profile._count.tweets,
                isFollowing: profile.followers
                    ? profile.followers.length > 0
                    : false,
            };
        }),
    toggleFollow: protectedProcedure
        .input(z.object({ userId: z.string() }))
        .mutation(async ({ input: { userId }, ctx }) => {
            const currentUserId = ctx.session.user.id;
            const existingFollow = await ctx.prisma.user.findFirst({
                where: {
                    id: userId,
                    followers: { some: { id: currentUserId } },
                },
            });

            let addedFollow;
            if (existingFollow == null) {
                await ctx.prisma.user.update({
                    where: { id: userId },
                    data: { followers: { connect: { id: currentUserId } } },
                });
                addedFollow = true;
            } else {
                await ctx.prisma.user.update({
                    where: { id: userId },
                    data: { followers: { disconnect: { id: currentUserId } } },
                });
                addedFollow = false;
            }

            void ctx.revalidateSSG?.(`/profiles/${userId}`);
            void ctx.revalidateSSG?.(`/profiles/${currentUserId}`);

            return { addedFollow };
        }),
    getFollowersById: publicProcedure
        .input(
            z.object({
                userId: z.string(),
            }),
        )
        .query(async ({ input, ctx }) => {
            const { userId } = input;
            try {
                const followers = await ctx.prisma.user.findFirst({
                    where: {
                        id: userId,
                    },
                    select: {
                        followers: {
                            select: {
                                id: true,
                                name: true,
                                image: true,
                            },
                        },
                    },
                });

                return followers;
            } catch (err) {
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: (err as { message: string }).message,
                });
            }
        }),
});
