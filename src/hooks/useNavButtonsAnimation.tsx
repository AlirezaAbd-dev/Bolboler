import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";

const useNavButtonsAnimation = () => {
  const navButtonsRef = useRef(null);

  useLayoutEffect(() => {
    gsap.context(() => {
      gsap.fromTo(
        ".nav-button",
        { opacity: 0, x: "-100" },
        { x: 0, opacity: 1, duration: 1, stagger: 0.4, delay: 0.5 }
      );
    }, navButtonsRef);
  }, []);

  return navButtonsRef;
};

export default useNavButtonsAnimation;
