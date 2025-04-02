import { useEffect } from "react";
import { motion } from "motion/react";

import { deleteIdea, saveIdea } from "../lib";

import { Card } from "../components";

import { IdeaCard, SortOption } from "../types";

type CardsListProps = {
    ideaCardCollection: IdeaCard[];
    setIdeaCardCollection: (arg: IdeaCard[]) => void;
    setSortChoice: (arg: SortOption | null) => void;
};

export default function CardsList({
    ideaCardCollection,
    setIdeaCardCollection,
    setSortChoice,
}: CardsListProps) {
    useEffect(() => {
        if (ideaCardCollection.length === 0) setSortChoice(null); // Clear sort menu choice if collection is empty
    }, [setSortChoice, ideaCardCollection]);

    // SAVE
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

    // DELETE
    const handleDeleteIdea = (id: string) => {
        const updatedCollection = deleteIdea(id, ideaCardCollection);

        setIdeaCardCollection(updatedCollection);
    };

    return (
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
                                handleSaveIdea(card, newTitle, newDescription)
                            }
                            onDelete={() => handleDeleteIdea(card.id)}
                        />
                    );
                })
            )}
        </motion.div>
    );
}
