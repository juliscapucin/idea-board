"use client";

import { useEffect, useState } from "react";

import { deleteIdea, saveIdea } from "./lib";

import { Card, Header } from "./components/";

import { IdeaCard, SortOption } from "./types";
import { createIdea, saveToLocalStorage, sortIdeas } from "./lib";
import { motion } from "motion/react";

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

    useEffect(() => {
        if (ideaCardCollection.length === 0) setSortChoice(null); // Clear sort menu choice if collection is empty
    }, [setSortChoice, ideaCardCollection]);

    // SAVE IDEA
    const handleSaveIdea = (
        card: IdeaCard,
        newTitle: string,
        newDescription: string
    ):
        | { status: "success" }
        | { status: "error"; message?: string; previousTitle?: string } => {
        setSortChoice(null); // Reset sort menu

        const result = saveIdea({
            card,
            newTitle,
            newDescription,
            ideaCardCollection,
        });

        if (result.status === "error") {
            return {
                status: "error",
                message: result.message,
                previousTitle: card.title,
            };
        }

        // Update collection
        setIdeaCardCollection(result.updatedCollection);

        return { status: "success" };
    };

    // DELETE IDEA
    const handleDeleteIdea = (id: string) => {
        const updatedCollection = deleteIdea(id, ideaCardCollection);

        setIdeaCardCollection(updatedCollection);
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
                <motion.div
                    className='cards-list__container'
                    layout // Motion settings
                    transition={{ duration: 0.2 }}
                    id='cards-list-container'
                >
                    {ideaCardCollection.length === 0 ? (
                        <div className='cards-list__no-cards'>
                            <p>No ideas in this collection</p>
                        </div>
                    ) : (
                        ideaCardCollection.map((card) => {
                            return (
                                <Card
                                    key={`ideaCard-${card.id}`}
                                    ideaCard={card}
                                    onSave={(newTitle, newDescription) =>
                                        handleSaveIdea(
                                            card,
                                            newTitle,
                                            newDescription
                                        )
                                    }
                                    onDelete={() => handleDeleteIdea(card.id)}
                                />
                            );
                        })
                    )}
                </motion.div>
            </main>
        </>
    );
}

export default App;
