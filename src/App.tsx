"use client";

import { useEffect, useState } from "react";

import { CardsList, Header } from "./components/";

import { IdeaCard, SortOption } from "./types";
import { createIdea, saveToLocalStorage, sortIdeas } from "./lib";

function App() {
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [sortChoice, setSortChoice] = useState<SortOption | null>(null);
    const [ideaCardCollection, setIdeaCardCollection] = useState<IdeaCard[]>(
        []
    );

    // CREATE NEW IDEA
    const handleCreateIdea = () => {
        setIdeaCardCollection(createIdea(ideaCardCollection));
        handleSort(null);
    };

    // SORT IDEAS
    const handleSort = (option: SortOption | null) => {
        if (option) {
            const sortedCollection = sortIdeas(option, ideaCardCollection);
            setIdeaCardCollection(sortedCollection);
        }

        setSortChoice(option);
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
        <>
            <Header
                createNewIdea={handleCreateIdea}
                onSort={(option: SortOption | null) => handleSort(option)}
                sortChoice={sortChoice}
            />
            <main className='main'>
                <CardsList
                    ideaCardCollection={ideaCardCollection}
                    setIdeaCardCollection={setIdeaCardCollection}
                    setSortChoice={setSortChoice}
                />
            </main>
        </>
    );
}

export default App;
