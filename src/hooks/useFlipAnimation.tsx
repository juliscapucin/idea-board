import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Flip from "gsap/Flip";
import { IdeaCard } from "../types";

gsap.registerPlugin(Flip);

export function useFlipAnimation(
    ideaCardCollection: IdeaCard[], // array of dependencies that trigger the animation
    getElements: () => Element[] | null
) {
    const flipStateRef = useRef<ReturnType<typeof Flip.getState> | null>(null);

    useLayoutEffect(() => {
        const elements = getElements();
        console.log(elements);
        if (!elements) return;

        // Capture pre-change state
        flipStateRef.current = Flip.getState(elements);
    }, [ideaCardCollection, getElements]);

    useLayoutEffect(() => {
        if (flipStateRef.current) {
            console.log("flip");
            Flip.from(flipStateRef.current, {
                duration: 0.5,
                ease: "power2.out",
                absolute: true,
            });
            flipStateRef.current = null;
        }
    }, [ideaCardCollection]);
}
