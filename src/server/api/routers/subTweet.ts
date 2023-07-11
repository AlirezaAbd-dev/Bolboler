import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

const subTweetRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        content: z.string(),
        mainTweetId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      const { content, mainTweetId } = input;

      const findTweet = await ctx.prisma.tweet.findFirst({
        where: {
          id: mainTweetId,
        },
      });

      if (!findTweet) {
        throw new TRPCError({
          message: "There is no such a tweet!",
          code: "NOT_FOUND",
        });
      }

      try {
        const newSubTweet = await ctx.prisma.subTweet.create({
          data: {
            content,
            userId: userId,
            mainTweetId,
          },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        });
        return newSubTweet;
      } catch (err) {
        throw new TRPCError({
          message: (err as { message: string }).message,
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
  getSubTweetsByTweetId: protectedProcedure
    .input(
      z.object({
        tweetId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { tweetId } = input;

      const subTweets = await ctx.prisma.subTweet.findMany({
        where: {
          mainTweetId: tweetId,
        },
        include: {
          user: {
            select: {
              name: true,
              id: true,
              image: true,
            },
          },
        },
      });

      return subTweets;
    }),
  delete: protectedProcedure
    .input(
      z.object({
        subTweetId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { subTweetId } = input;

      try {
        const deletedSubTweet = await ctx.prisma.subTweet.delete({
          where: {
            id: subTweetId,
          },
        });
        return deletedSubTweet;
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: (err as { message: string }).message,
        });
      }
    }),
  edit: protectedProcedure
    .input(
      z.object({
        subTweetId: z.string(),
        content: z
          .string()
          .min(3, { message: "content must be more than 3 characters!" }),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { content, subTweetId } = input;

      try {
        const updatedTweet = await ctx.prisma.subTweet.update({
          where: { id: subTweetId },
          data: {
            content,
          },
        });

        return updatedTweet;
      } catch (err) {
        throw new TRPCError({
          message: (err as { message: string }).message,
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
});

export default subTweetRouter;
