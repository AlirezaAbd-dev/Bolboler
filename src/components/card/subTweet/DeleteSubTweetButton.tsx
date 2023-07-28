import { RiDeleteBin2Line } from 'react-icons/ri';

import { IconHoverEffect } from '~/components/ui/IconHoverEffect';
import Tooltip from '~/components/ui/Tooltip';

type DeleteSubTweetButtonProps = {
    id: string;
    setSelectedSubTweetForDelete: (selectSubTweet: string) => void;
    openModal: () => void;
};

const DeleteSubTweetButton = (props: DeleteSubTweetButtonProps) => {
    return (
        <span
            className="cursor-pointer"
            onClick={() => {
                props.openModal();
                props.setSelectedSubTweetForDelete(props.id);
            }}
        >
            <Tooltip content="Delete" place="bottom" id="delete">
                <IconHoverEffect>
                    <RiDeleteBin2Line className="h-3 w-3 md:h-4 md:w-4 text-red-500" />
                </IconHoverEffect>
            </Tooltip>
        </span>
    );
};

export default DeleteSubTweetButton;
