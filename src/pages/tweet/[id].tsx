import type {
  GetServerSidePropsContext,
  InferGetStaticPropsType,
  NextPage,
} from "next";

import TweetDetailsMain from "~/components/tweetDetails/TweetDetailsMain";
import { ssgHelper } from "~/server/api/ssgHelper";

//? COMPONENT
const TweetPage: NextPage<
  InferGetStaticPropsType<typeof getServerSideProps>
> = ({ id }) => {
  return <TweetDetailsMain id={id} />;
};

//! SSR
export const getServerSideProps = async (
  context: GetServerSidePropsContext<{ id: string }>
) => {
  const id = context.params?.id;
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  if (id == null) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
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
};

export default TweetPage;
