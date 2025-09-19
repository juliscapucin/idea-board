type IdeaCard = {
    id: string;
    title: string;
    description: string;
    dateCreated: number | null;
    dateUpdated: number | null;
};

type SortOption = "Title" | "Date";

type DragElement = {
    card: IdeaCard;
    index: number;
} | null;

export type { IdeaCard, SortOption, DragElement };
