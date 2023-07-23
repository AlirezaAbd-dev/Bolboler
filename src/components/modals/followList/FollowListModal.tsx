import ModalLayout from '../ModalLayout';
import FollowersSection from './FollowersSection';
import FollowingSection from './FollowingSection';

type FollowerListModalProps = {
    mode: 'Followers' | 'Following';
    userId: string;
    isModalOpen: boolean;
    closeModal: () => void;
};

const FollowerListModal = (props: FollowerListModalProps) => {
    return (
        <ModalLayout
            closeModal={props.closeModal}
            modalIsOpen={props.isModalOpen}
            title={props.mode}
        >
            {props.mode === 'Followers' && (
                <FollowersSection userId={props.userId} />
            )}

            {props.mode === 'Following' && (
                <FollowingSection userId={props.userId} />
            )}
        </ModalLayout>
    );
};

export default FollowerListModal;
