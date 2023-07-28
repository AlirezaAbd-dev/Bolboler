import { VscClose, VscEdit } from 'react-icons/vsc';

import { IconHoverEffect } from '~/components/ui/IconHoverEffect';
import Tooltip from '~/components/ui/Tooltip';

type EditButtonProps = {
    editMode: boolean;
    toggleEditMode: () => void;
};

const EditButton = (props: EditButtonProps) => {
    return (
        <span
            className="ml-3 md:ml-6 cursor-pointer"
            onClick={() => props.toggleEditMode()}
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

export default EditButton;
