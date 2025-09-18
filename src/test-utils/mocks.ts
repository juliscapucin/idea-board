import { IdeaCard } from "../types";

// NEW EMPTY CARD
export const mockNewIdeaCard = {
    id: crypto.randomUUID(),
    title: "",
    description: "",
    dateCreated: null,
    dateUpdated: null,
};

// SINGLE CARD
export const mockIdeaCard = {
    id: crypto.randomUUID(),
    title: "Mock Title",
    description: "Mock Description",
    dateCreated: Date.now(),
    dateUpdated: null,
};

// CARD COLLECTION
export const mockIdeaCardCollection = (count = 6): IdeaCard[] =>
    Array.from({ length: count }, (_, i) => {
        return {
            id: crypto.randomUUID(),
            title: `Mock Title ${i + 1}`,
            description: `Mock Description ${i + 1}`,
            dateCreated: Date.now(),
            dateUpdated: null,
        };
    });
