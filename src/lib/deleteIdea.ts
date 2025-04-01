import { IdeaCard } from "../types";

export const deleteIdea = (id: string, ideaCardCollection: IdeaCard[]) => {
    const updatedCollection = ideaCardCollection.filter((card) => {
        if (card.id !== id) return card;
    });

    return updatedCollection;
};
