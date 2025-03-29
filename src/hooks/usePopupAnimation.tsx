import { useLayoutEffect } from "react";
import gsap from "gsap";

export default function usePopupAnimation(
    state: boolean,
    element: HTMLElement | null
) {
    useLayoutEffect(() => {
        if (!element) return;

        const ctx = gsap.context(() => {
            if (state) {
                // SHOW POPUP
                gsap.fromTo(
                    element,
                    { opacity: 0, scale: 0.8, yPercent: -6 },
                    {
                        opacity: 1,
                        scale: 1,
                        yPercent: 0,
                        duration: 0.3,
                        ease: "power2.out",
                    }
                );
            } else {
                // HIDE POPUP
                gsap.fromTo(
                    element,
                    { opacity: 1, scale: 1, yPercent: 0 },
                    {
                        opacity: 0,
                        scale: 0.9,
                        yPercent: -6,
                        duration: 0.2,
                        ease: "power2.in",
                    }
                );
            }
        });

        return () => ctx.revert();
    }, [state, element]);
}
