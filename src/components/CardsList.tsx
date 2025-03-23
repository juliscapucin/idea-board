import { IdeaCardType } from "../types"
import { Card } from "../components"

type CardsListProps = {
	ideaCardCollection: IdeaCardType[]
	setIdeaCardCollection: (arg: IdeaCardType[]) => void
}

export default function CardsList({
	ideaCardCollection,
	setIdeaCardCollection,
}: CardsListProps) {
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
