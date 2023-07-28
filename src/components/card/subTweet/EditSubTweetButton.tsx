import type { Dispatch, SetStateAction } from 'react';
import { VscClose, VscEdit } from 'react-icons/vsc';

import { IconHoverEffect } from '~/components/ui/IconHoverEffect';
import Tooltip from '~/components/ui/Tooltip';

type EditSubTweetButtonProps = {
    editMode: boolean;
    setEditMode: Dispatch<SetStateAction<boolean>>;
};

const EditSubTweetButton = (props: EditSubTweetButtonProps) => {
    return (
        <span
            className="ml-6 cursor-pointer"
            onClick={() => props.setEditMode((prevState) => !prevState)}
        >
            <Tooltip content="Edit" place="bottom" id="edit">
                <IconHoverEffect>
                    {!props.editMode ? (
                        <VscEdit className="h-3 w-3 md:h-4 md:w-4 text-gray-500 dark:text-gray-300" />
                    ) : (
                        <VscClose className="h-3 w-3 md:h-4 md:w-4 text-red-500" />
                    )}
                </IconHoverEffect>
            </Tooltip>
        </span>
    );
};

export default EditSubTweetButton;
