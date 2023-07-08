import { Tooltip as ReactTooltip } from "react-tooltip";
import type { PlacesType } from "react-tooltip";

type TooltipProps = {
  children: React.ReactNode;
  id: string;
  place?: PlacesType;
  content: string;
};

const Tooltip = (props: TooltipProps) => {
  return (
    <>
      <span
        data-tooltip-id={props.id}
        data-tooltip-content={props.content}
        data-tooltip-place={props.place}
      >
        {props.children}
      </span>
      <ReactTooltip id={props.id} place={props.place} content={props.content} />
    </>
  );
};

export default Tooltip;
