import { api } from '~/utils/api';

type UseCreateSubTweetProps = {
    tweetId: string;
    setInputValue: (value: string) => void;
};

const useCreateSubTweetMutation = (props: UseCreateSubTweetProps) => {
    const trpcUtils = api.useContext();

    const createSubTweetMutation = api.subTweet.create.useMutation({
        onSuccess: (newSubTweet) => {
            props.setInputValue('');
            trpcUtils.subTweet.getSubTweetsByTweetId.setData(
                { tweetId: props.tweetId },
                (oldData) => {
                    if (oldData && oldData.length > 0) {
                        const newData = [...oldData];
                        newData.push(newSubTweet);

                        return newData;
                    } else {
                        const dataArray = [];

                        dataArray.push(newSubTweet);
                        return dataArray;
                    }
                },
            );
        },
    });

    return createSubTweetMutation;
};

export default useCreateSubTweetMutation;
