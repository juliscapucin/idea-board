"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

import {
    createIdea,
    saveToLocalStorage,
    sortIdeas,
    deleteIdea,
    saveIdea,
} from "./lib";

import { Card, Header } from "./components/";

import { IdeaCard, SortOption, DragElement } from "./types";

function App() {
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [sortChoice, setSortChoice] = useState<SortOption | null>(null);
    const [draggedCard, setDraggedCard] = useState<DragElement>(null);
    const [dragOverCard, setDragOverCard] = useState<DragElement>(null);
    const cardsListContainerRef = useRef<HTMLDivElement | null>(null);

    const [ideaCardCollection, setIdeaCardCollection] = useState<IdeaCard[]>(
        []
    );

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

    // DRAG AND DROP REORDERING
    const handleDragStart = (card: IdeaCard, index: number) => {
        setDraggedCard({ card, index });
    };

    const handleDragOver = (card: IdeaCard, index: number) => {
        setDragOverCard({ card, index });
    };

    const handleDragEnd = () => {
        if (draggedCard && dragOverCard) {
            reorderCards(draggedCard, dragOverCard);
        }
        setDraggedCard(null);
        setDragOverCard(null);
    };

    const reorderCards = (
        draggedCard: DragElement,
        targetCard: DragElement
    ) => {
        if (
            !draggedCard ||
            !targetCard ||
            draggedCard.card.id === targetCard.card.id
        )
            return; // No need to reorder if the same card

        const updatedCollection = [...ideaCardCollection];
        const draggedIndex = updatedCollection.findIndex(
            (card) => card.id === draggedCard.card.id
        );
        const targetIndex = updatedCollection.findIndex(
            (card) => card.id === targetCard.card.id
        );

        // Remove dragged card from its original position
        updatedCollection.splice(draggedIndex, 1);
        // Insert dragged card at the target position
        updatedCollection.splice(targetIndex, 0, draggedCard.card);

        setIdeaCardCollection(updatedCollection);
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
            <main className='main container'>
                <motion.div
                    className='cards-list__container'
                    id='cards-list-container'
                    ref={cardsListContainerRef}
                    layout // Motion settings
                    transition={{ duration: 0.2 }}
                >
                    {/* Empty state */}
                    {ideaCardCollection.length === 0 ? (
                        <div className='cards-list__no-cards'>
                            <p>No ideas in this collection</p>
                        </div>
                    ) : (
                        // * Idea cards * //
                        ideaCardCollection.map(
                            (card: IdeaCard, index: number) => {
                                return (
                                    <Card
                                        key={`ideaCard-${card.id}`}
                                        ideaCard={card}
                                        onDragStart={() =>
                                            handleDragStart(card, index)
                                        }
                                        onDragOver={() =>
                                            handleDragOver(card, index)
                                        }
                                        onDragEnd={() => handleDragEnd()}
                                        draggedCard={draggedCard}
                                        dragOverCard={dragOverCard}
                                        index={index}
                                        onSaveIdea={(
                                            newTitle,
                                            newDescription
                                        ) =>
                                            handleSaveIdea(
                                                card,
                                                newTitle,
                                                newDescription
                                            )
                                        }
                                        onDeleteIdea={() =>
                                            handleDeleteIdea(card.id)
                                        }
                                    />
                                );
                            }
                        )
                    )}
                </motion.div>
            </main>
        </>
    );
}

export default App;
