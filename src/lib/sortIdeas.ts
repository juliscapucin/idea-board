import { IdeaCard, SortOption } from "../types";

export const sortIdeas = (
    option: SortOption,
    ideaCardCollection: IdeaCard[]
): IdeaCard[] => {
    const sortedCollection = [...ideaCardCollection];

    switch (option) {
        case "Title":
            sortedCollection.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case "Date":
            sortedCollection.sort((a, b) => {
                const dateA = a.dateCreated ?? 0; // if hasn't been saved, set date to 0
                const dateB = b.dateCreated ?? 0; // " "
                return dateA - dateB;
            });
            break;
        default:
            // no sorting needed
            break;
    }

    return sortedCollection;
};
