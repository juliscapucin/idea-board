type IdeaCard = {
    id: string;
    title: string;
    description: string;
    dateCreated: number | null;
    dateUpdated: number | null;
};

type SortOption = "Title" | "Date";

export type { IdeaCard, SortOption };
