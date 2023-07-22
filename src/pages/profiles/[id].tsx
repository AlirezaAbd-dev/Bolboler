import type {
    GetStaticPaths,
    GetStaticPropsContext,
    InferGetStaticPropsType,
    NextPage,
} from 'next';
import ErrorPage from 'next/error';
import Head from 'next/head';
import { InfiniteTweetList } from '~/components/InfiniteTweetList';
import ProfileHeader from '~/components/ProfileHeader';
import { ssgHelper } from '~/server/api/ssgHelper';
import { api } from '~/utils/api';

const ProfilePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
    id,
}) => {
    const { data: profile } = api.profile.getById.useQuery({ id });
    const tweets = api.tweet.infiniteProfileFeed.useInfiniteQuery(
        { userId: id },
        { getNextPageParam: (lastPage) => lastPage.nextCursor },
    );

    if (profile == null || profile.name == null) {
        return <ErrorPage statusCode={404} />;
    }

    return (
        <>
            <Head>
                <title>{`Bolboler - ${profile.name}`}</title>
            </Head>
            <ProfileHeader id={id} />
            <main>
                <InfiniteTweetList
                    tweets={tweets.data?.pages.flatMap((page) => page.tweets)}
                    isError={tweets.isError}
                    isLoading={tweets.isLoading}
                    hasMore={tweets.hasNextPage}
                    fetchNewTweets={tweets.fetchNextPage}
                />
            </main>
        </>
    );
};

export const getStaticPaths: GetStaticPaths = () => {
    return {
        paths: [],
        fallback: 'blocking',
    };
};

export async function getStaticProps(
    context: GetStaticPropsContext<{ id: string }>,
) {
    const id = context.params?.id;

    if (!id) {
        return {
            redirect: {
                destination: '/',
            },
        };
    }

    const ssg = ssgHelper();
    await ssg.profile.getById.prefetch({ id });

    return {
        props: {
            trpcState: ssg.dehydrate(),
            id,
        },
    };
}

export default ProfilePage;
