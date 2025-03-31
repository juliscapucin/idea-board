"use client";

import { useEffect, useRef, useState } from "react";

import { CardsList, Header } from "./components/";

import { SortContextProvider } from "./context";

import { IdeaCard } from "./types";
import { createIdea, saveToLocalStorage } from "./lib";
// import { useFlipAnimation } from "./hooks";

function App() {
    const [isFirstLoad, setIsFirstLoad] = useState(true);

    const containerRef = useRef<HTMLDivElement>(null);

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

    //   ANIMATION
    //   useFlipAnimation(ideaCardCollection, () =>
    //       containerRef.current ? Array.from(containerRef.current.children) : null
    //   );

    return (
        <main className='main'>
            <SortContextProvider>
                <Header
                    ideaCardCollection={ideaCardCollection}
                    setIdeaCardCollection={setIdeaCardCollection}
                    createNewIdea={handleCreateIdea}
                />
                {/* CARDS LIST */}
                <div ref={containerRef} className='cards-list__container'>
                    <CardsList
                        ideaCardCollection={ideaCardCollection}
                        setIdeaCardCollection={setIdeaCardCollection}
                    />
                </div>
            </SortContextProvider>
        </main>
    );
}

export default App;
