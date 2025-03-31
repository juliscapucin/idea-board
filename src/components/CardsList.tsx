import { IdeaCard } from "../types";
import { Card } from "../components";
import { useSortMenuContext } from "../context";
import { useEffect } from "react";

type CardsListProps = {
    ideaCardCollection: IdeaCard[];
    setIdeaCardCollection: (arg: IdeaCard[]) => void;
};

export default function CardsList({
    ideaCardCollection,
    setIdeaCardCollection,
}: CardsListProps) {
    const { setSortChoice } = useSortMenuContext();

    useEffect(() => {
        if (ideaCardCollection.length === 0) setSortChoice(""); // Clear sort menu choice if collection is empty
    }, [setSortChoice, ideaCardCollection]);

    return ideaCardCollection.length === 0 ? (
        <div className='cards-list__no-cards'>
            <p>No cards in this collection</p>
        </div>
    ) : (
        ideaCardCollection.map((ideaCard) => {
            return (
                <Card
                    key={`ideaCard-${ideaCard.id}`}
                    ideaCard={ideaCard}
                    ideaCardCollection={ideaCardCollection}
                    setIdeaCardCollection={setIdeaCardCollection}
                />
            );
        })
    );
}
