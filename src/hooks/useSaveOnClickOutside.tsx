import { useEffect } from "react";

export default function useSaveOnClickOutside(
    ideaCardRef: React.RefObject<HTMLDivElement | null>,
    title: string,
    newTitle: string,
    description: string,
    newDescription: string,
    handleSave: (newTitle: string, newDescription: string) => void
) {
    useEffect(() => {
        if (!ideaCardRef.current) return;

        const ideaCardElement = ideaCardRef.current;

        const handleClickOutside = (e: Event) => {
            if (
                (title !== newTitle || description !== newDescription) &&
                !ideaCardElement.contains(e.target as Node)
            ) {
                handleSave(newTitle, newDescription);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [description, title, newTitle, newDescription]);
}
