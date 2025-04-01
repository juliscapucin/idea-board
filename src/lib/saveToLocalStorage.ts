import { IdeaCard } from "../types";

export const saveToLocalStorage = (ideaCardCollection: IdeaCard[]) => {
    localStorage.setItem(
        "ideaCardCollection",
        JSON.stringify(ideaCardCollection)
    );
};
