import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import ErrorPage from "next/error";
import Head from "next/head";
import TweetDetails from "~/components/tweetDetails/TweetDetails";
import TweetDetailsHeader from "~/components/tweetDetails/TweetDetailsHeader";
import { ssgHelper } from "~/server/api/ssgHelper";
import { api } from "~/utils/api";

const TweetPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  id,
}) => {
  const tweet = api.tweet.getTweetById.useQuery({ id });
  console.log(tweet.data);

  if (tweet.error) {
    return <ErrorPage statusCode={404} />;
  }

  if (tweet.isSuccess) {
    return (
      <>
        <Head>
          <title>{`Bolboler - Tweet Details`}</title>
        </Head>
        <TweetDetailsHeader />
        <TweetDetails />
      </>
    );
  }
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
