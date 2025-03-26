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
            sortedCollection.sort((a, b) =>
                a.dateCreated && b.dateCreated
                    ? a.dateCreated - b.dateCreated
                    : 0
            );
            break;
        default:
            // no sorting needed
            break;
    }

    return sortedCollection;
};
