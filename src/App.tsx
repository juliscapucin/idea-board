"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

import {
    createIdea,
    saveToLocalStorage,
    sortIdeas,
    deleteIdea,
    saveIdea,
} from "./lib";

import { Card, Header } from "./components/";

import { IdeaCard, SortOption } from "./types";

function App() {
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [sortChoice, setSortChoice] = useState<SortOption | null>(null);
    const [showToast, setShowToast] = useState<string | null>(null);

    const [ideaCardCollection, setIdeaCardCollection] = useState<IdeaCard[]>(
        []
    );

    // SHOW TOAST
    const handleShowToast = (id?: string) => {
        setShowToast(id || null); // if id is not passed, set null
    };

    // CREATE NEW IDEA
    const handleCreateIdea = () => {
        setIdeaCardCollection(createIdea(ideaCardCollection));
        handleSort(null);
    };

    // SAVE IDEA
    const handleSaveIdea = (
        card: IdeaCard,
        newTitle: string,
        newDescription: string
    ) => {
        setSortChoice(null); // Reset sort menu

        // Update collection
        setIdeaCardCollection(
            saveIdea({
                card,
                newTitle,
                newDescription,
                ideaCardCollection,
            })
        );

        handleShowToast(card.id);
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
            setSortChoice(option);
        }
    };

    // RETRIEVE CARDS FROM LOCAL STORAGE ON FIRST LOAD
    useEffect(() => {
        const cards = localStorage.getItem("ideaCardCollection");
        if (cards) setIdeaCardCollection(JSON.parse(cards));

        setIsFirstLoad(false);
    }, []);

    // SAVE TO LOCAL STORAGE
    useEffect(() => {
        if (isFirstLoad) return;

        saveToLocalStorage(ideaCardCollection);
    }, [ideaCardCollection, isFirstLoad]);

    // CLEAR SORT MENU
    useEffect(() => {
        if (ideaCardCollection.length === 0) setSortChoice(null); // Clear sort menu if collection is empty
    }, [setSortChoice, ideaCardCollection]);

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
                                    showToast={showToast === card.id}
                                    handleShowToast={handleShowToast}
                                    handleSaveIdea={(
                                        newTitle,
                                        newDescription
                                    ) =>
                                        handleSaveIdea(
                                            card,
                                            newTitle,
                                            newDescription
                                        )
                                    }
                                    handleDeleteIdea={() =>
                                        handleDeleteIdea(card.id)
                                    }
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
