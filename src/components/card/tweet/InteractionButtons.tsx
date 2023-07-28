import React from 'react';

import HeartButton from '~/components/ui/HeartButton';
import ReplyButton from '~/components/ui/ReplyButton';
import useToggleLikeMutation from '~/hooks/useToggleLikeMutation';

type InteractionButtonsProps = {
    id: string;
    user: {
        id: string;
        name: string | null;
        image: string | null;
    };
    likedByMe: boolean;
    likeCount: number;
    subTweetCount: number;
};

const InteractionButtons = (props: InteractionButtonsProps) => {
    const toggleLike = useToggleLikeMutation({
        id: props.id,
        user: { id: props.user.id },
    });

    function handleToggleLike() {
        toggleLike.mutate({ id: props.id });
    }

    return (
        <div className="flex items-center gap-3">
            <HeartButton
                onClick={handleToggleLike}
                isLoading={toggleLike.isLoading}
                likedByMe={props.likedByMe}
                likeCount={props.likeCount}
                tweetId={props.id}
            />
            <ReplyButton subTweetCount={props.subTweetCount} id={props.id} />
        </div>
    );
};
export default InteractionButtons;
