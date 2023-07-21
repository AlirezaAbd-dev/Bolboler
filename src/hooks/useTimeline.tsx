import gsap from "gsap";
import { useState } from "react";

const useTimeline = (vars: gsap.TimelineVars) => {
  const [timeline, setTimeline] = useState(() => {
    return gsap.timeline(vars);
  });

  return { tl: timeline, setTl: setTimeline };
};

export default useTimeline;
