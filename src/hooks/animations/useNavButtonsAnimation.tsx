import gsap from 'gsap';
import { useSession } from 'next-auth/react';
import { useEffect, useRef } from 'react';

const useNavButtonsAnimation = () => {
    const session = useSession();
    const navButtonsRef = useRef(null);

    useEffect(() => {
        gsap.context(() => {
            gsap.fromTo(
                '.nav-button',
                { opacity: 0, x: '-100' },
                { x: 0, opacity: 1, duration: 1, stagger: 0.4, delay: 0.5 },
            );
        }, navButtonsRef);
    }, [session.status]);

    return navButtonsRef;
};

export default useNavButtonsAnimation;
