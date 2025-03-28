import { IdeaCardType } from "../types"
import { Card } from "../components"
import { useSortMenuContext } from "../context"

type CardsListProps = {
	ideaCardCollection: IdeaCardType[]
	setIdeaCardCollection: (arg: IdeaCardType[]) => void
}

export default function CardsList({
	ideaCardCollection,
	setIdeaCardCollection,
}: CardsListProps) {
	const { setSortChoice } = useSortMenuContext()

	if (ideaCardCollection.length === 0) setSortChoice("") // Clear sort menu choice if collection is empty

	return ideaCardCollection.length === 0 ? (
		<div className='cards-list__no-cards'>
			<p>No cards in this collection</p>
		</div>
	) : (
		ideaCardCollection.map((ideaCard, index) => {
			return (
				<Card
					key={`ideaCard-${ideaCard.id}`}
					{...{
						ideaCard,
						ideaCardCollection,
						setIdeaCardCollection,
						cardIndex: index,
					}}
				/>
			)
		})
	)
}
