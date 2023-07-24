import { Tooltip as ReactTooltip } from 'react-tooltip';
import type { PlacesType } from 'react-tooltip';

type TooltipProps = {
    children: React.ReactNode;
    id: string;
    place?: PlacesType;
    content: string;
    delayShow?: number;
    delayHide?: number;
    classNames?: string;
};

const Tooltip = (props: TooltipProps) => {
    return (
        <>
            <span
                data-tooltip-id={props.id}
                data-tooltip-content={props.content}
                data-tooltip-place={props.place}
                className={`text-xs md:text-base ${props.classNames || ''}`}
            >
                {props.children}
            </span>
            <ReactTooltip
                className="dark:bg-gray-800 dark:text-white"
                variant="light"
                style={{ borderRadius: '10px' }}
                border="1px solid lightblue"
                id={props.id}
                place={props.place}
                content={props.content}
                delayShow={props.delayShow}
                delayHide={props.delayHide}
            />
        </>
    );
};

export default Tooltip;
