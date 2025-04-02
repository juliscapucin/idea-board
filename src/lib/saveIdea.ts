import { IdeaCard } from "../types";
import { emptyTitleMessage } from "../lib/alert-messages";

type SaveIdeaArgs = {
    card: IdeaCard;
    newTitle: string;
    newDescription: string;
    ideaCardCollection: IdeaCard[];
};

type SaveIdeaResult =
    | { status: "error"; message: string; updatedCollection: null }
    | { status: "success"; updatedCollection: IdeaCard[] };

export function saveIdea({
    card,
    newTitle,
    newDescription,
    ideaCardCollection,
}: SaveIdeaArgs): SaveIdeaResult {
    const index = ideaCardCollection.findIndex(
        (element) => element.id === card.id
    );
    if (index === -1) {
        return {
            status: "error",
            message: "Card not found",
            updatedCollection: null,
        };
    }

    // Check for invalid new title
    if (card.title !== newTitle && newTitle.trim().length < 2) {
        return {
            status: "error",
            message: emptyTitleMessage,
            updatedCollection: null,
        };
    }

    // No changes
    if (card.title === newTitle && card.description === newDescription) {
        return { status: "success", updatedCollection: ideaCardCollection };
    }

    // With changes
    const updatedCard: IdeaCard = {
        id: card.id,
        title: newTitle,
        description: newDescription,
        dateCreated: card.dateCreated ?? Date.now(),
        dateUpdated: card.dateCreated ? Date.now() : null,
    };

    const updatedCollection = [...ideaCardCollection];
    updatedCollection[index] = updatedCard;

    return { status: "success", updatedCollection };
}
