"use client";

import { useEffect, useState } from "react";

import { CardsList, Header } from "./components/";

import { IdeaCard, SortOption } from "./types";
import { createIdea, saveToLocalStorage, sortIdeas } from "./lib";
// import { useFlipAnimation } from "./hooks";

function App() {
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [ideaCardCollection, setIdeaCardCollection] = useState<IdeaCard[]>(
        []
    );

    // CREATE NEW IDEA
    const handleCreateIdea = () => {
        setIdeaCardCollection(createIdea(ideaCardCollection));
    };

    // SORT IDEAS
    const handleSort = (option: SortOption) => {
        const sortedCollection = sortIdeas(option, ideaCardCollection);
        setIdeaCardCollection(sortedCollection);

        return option;
    };

    // SAVE TO LOCAL STORAGE
    useEffect(() => {
        if (isFirstLoad) return;

        saveToLocalStorage(ideaCardCollection);
    }, [ideaCardCollection, isFirstLoad]);

    // RETRIEVE CARDS FROM LOCAL STORAGE
    useEffect(() => {
        const cards = localStorage.getItem("ideaCardCollection");
        if (cards) setIdeaCardCollection(JSON.parse(cards));

        setIsFirstLoad(false);
    }, []);

    return (
        <main className='main'>
            <Header
                createNewIdea={handleCreateIdea}
                onSort={(option: SortOption) => handleSort(option)}
            />
            <CardsList
                ideaCardCollection={ideaCardCollection}
                setIdeaCardCollection={setIdeaCardCollection}
            />
        </main>
    );
}

export default App;
