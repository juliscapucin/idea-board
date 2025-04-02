import { IdeaCard } from "../types";

export function createIdea(ideaCardCollection: IdeaCard[]) {
    return [
        {
            id: crypto.randomUUID(), // needs to be UNIQUE and STABLE to be used as key
            title: "",
            description: "",
            dateCreated: null,
            dateUpdated: null,
        },
        ...ideaCardCollection,
    ];
}
