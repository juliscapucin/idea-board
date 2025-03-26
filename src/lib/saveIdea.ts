import { IdeaCard } from "../types";
import { emptyTitleMessage } from "../lib/alert-messages";

type SaveIdeaArgs = {
    id: string;
    newTitle: string;
    newDescription: string;
    collection: IdeaCard[];
    dateCreated: number | null;
    title: string;
    description: string;
};

type SaveIdeaResult =
    | { status: "error"; message: string; updatedCollection: null }
    | { status: "success"; updatedCollection: IdeaCard[] };

export function saveIdea({
    id,
    newTitle,
    newDescription,
    collection,
    dateCreated,
    title,
    description,
}: SaveIdeaArgs): SaveIdeaResult {
    const index = collection.findIndex((card) => card.id === id);
    if (index === -1) {
        return {
            status: "error",
            message: "Card not found",
            updatedCollection: null,
        };
    }

    // Check for invalid new title
    if (title !== newTitle && newTitle.trim().length < 2) {
        return {
            status: "error",
            message: emptyTitleMessage,
            updatedCollection: null,
        };
    }

    // No changes
    if (title === newTitle && description === newDescription) {
        return { status: "success", updatedCollection: collection };
    }

    // With changes
    const updatedCard: IdeaCard = {
        id,
        title: newTitle,
        description: newDescription,
        dateCreated: dateCreated ?? Date.now(),
        dateUpdated: dateCreated ? Date.now() : null,
    };

    const updatedCollection = [...collection];
    updatedCollection[index] = updatedCard;

    return { status: "success", updatedCollection };
}
