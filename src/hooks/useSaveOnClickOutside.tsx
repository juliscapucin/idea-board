import { useEffect } from "react";

export default function useSaveOnClickOutside(
    ideaCardRef: React.RefObject<HTMLDivElement | null>,
    title: string,
    newTitle: string,
    description: string,
    newDescription: string,
    handleSave: (newTitle: string, newDescription: string) => void,
    handleToggleToast: (param: boolean) => void
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
                handleToggleToast(true);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [description, title, newTitle, newDescription, handleSave, ideaCardRef]);
}
