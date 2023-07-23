import ModalLayout from '../ModalLayout';

type FollowerListModalProps = {
    isModalOpen: boolean;
    closeModal: () => void;
};

const FollowerListModal = (props: FollowerListModalProps) => {
    


    return (
        <ModalLayout
            closeModal={props.closeModal}
            modalIsOpen={props.isModalOpen}
            title="Followers"
        >
            yoyo
        </ModalLayout>
    );
};

export default FollowerListModal;
