import gsap from 'gsap';
import { useEffect, useRef } from 'react';

const useLogoAnimation = () => {
    const headerRef = useRef(null);

    useEffect(() => {
        gsap.context(() => {
            gsap.fromTo(
                '.logo',
                { y: '-100', opacity: 0 },
                {
                    duration: 1.5,
                    stagger: 0.5,
                    y: 0,
                    opacity: 1,
                    ease: 'back',
                },
            );
        }, headerRef);
    }, []);

    return headerRef;
};
export default useLogoAnimation;
