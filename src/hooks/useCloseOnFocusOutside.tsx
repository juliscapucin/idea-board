import { useEffect } from "react";

export default function useCloseOnFocusOutside(
    container: HTMLElement | null,
    state: boolean,
    setState: (arg: boolean) => void
) {
    useEffect(() => {
        if (!container || !state) return;

        function handleFocusOut(e: FocusEvent) {
            // If the newly focused element is outside the container, close it
            if (container && !container.contains(e.relatedTarget as Node)) {
                setState(false);
            }
        }

        container.addEventListener("focusout", handleFocusOut);

        return () => {
            container.removeEventListener("focusout", handleFocusOut);
        };
    }, [container, state, setState]);
}
