import { api } from '~/utils/api';

type UseEditSubTweetProps = {
    tweetId: string;
    onClose: () => void;
};

const useEditSubTweetMutation = (props: UseEditSubTweetProps) => {
    const trpcUtils = api.useContext();

    const editSubTweetMutation = api.subTweet.edit.useMutation({
        onSuccess(changedData) {
            trpcUtils.subTweet.getSubTweetsByTweetId.setData(
                { tweetId: props.tweetId },
                (oldData) => {
                    if (oldData) {
                        const changedItemIndex = oldData.findIndex(
                            (d) => d.id === changedData.id,
                        );

                        if (oldData[changedItemIndex]) {
                            (
                                oldData[changedItemIndex] as { content: string }
                            ).content = changedData.content;

                            return oldData;
                        }
                    }
                },
            );
            props.onClose();
        },
    });

    return editSubTweetMutation;
};

export default useEditSubTweetMutation;
