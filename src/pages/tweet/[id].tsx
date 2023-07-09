import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from "next";

import TweetDetailsMain from "~/components/tweetDetails/TweetDetailsMain";
import { ssgHelper } from "~/server/api/ssgHelper";

const TweetPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  id,
}) => {
  return <TweetDetailsMain id={id} />;
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export async function getStaticProps(
  context: GetStaticPropsContext<{ id: string }>
) {
  const id = context.params?.id;

  if (id == null) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  const ssg = ssgHelper();
  await ssg.tweet.getTweetById.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
}

export default TweetPage;
