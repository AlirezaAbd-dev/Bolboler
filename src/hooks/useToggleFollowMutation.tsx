import { api } from '~/utils/api';

const useToggleFollowMutation = (props: { id: string }) => {
    const trpcUtils = api.useContext();
    const toggleFollow = api.profile.toggleFollow.useMutation({
        onSuccess: ({ addedFollow }) => {
            trpcUtils.profile.getById.setData({ id: props.id }, (oldData) => {
                if (oldData == null) return;

                const countModifier = addedFollow ? 1 : -1;
                return {
                    ...oldData,
                    isFollowing: addedFollow,
                    followersCount: oldData.followersCount + countModifier,
                };
            });
        },
    });

    return toggleFollow;
};

export default useToggleFollowMutation;
