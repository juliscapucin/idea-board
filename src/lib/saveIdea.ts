import { IdeaCard } from "../types";

type SaveIdeaArgs = {
    card: IdeaCard;
    newTitle: string;
    newDescription: string;
    ideaCardCollection: IdeaCard[];
};

export function saveIdea({
    card,
    newTitle,
    newDescription,
    ideaCardCollection,
}: SaveIdeaArgs): IdeaCard[] {
    const index = ideaCardCollection.findIndex(
        (element) => element.id === card.id
    );

    // No changes
    if (card.title === newTitle && card.description === newDescription) {
        return ideaCardCollection;
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

    return updatedCollection;
}
