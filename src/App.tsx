"use client";

import { useEffect, useState } from "react";

import { CardsList, Header } from "./components/";

import { IdeaCard } from "./types";
import { createIdea, saveToLocalStorage } from "./lib";
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
                ideaCardCollection={ideaCardCollection}
                setIdeaCardCollection={setIdeaCardCollection}
                createNewIdea={handleCreateIdea}
            />
            <CardsList
                ideaCardCollection={ideaCardCollection}
                setIdeaCardCollection={setIdeaCardCollection}
            />
        </main>
    );
}

export default App;
