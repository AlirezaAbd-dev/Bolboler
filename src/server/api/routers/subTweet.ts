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
});

export default subTweetRouter;
