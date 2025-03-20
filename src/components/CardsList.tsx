import { IdeaCardType } from "../types"
import { IdeaCard } from "../components"

type CardsListProps = {
	ideaCardCollection: IdeaCardType[]
	setIdeaCardCollection: (arg: IdeaCardType[]) => void
}

export default function CardsList({
	ideaCardCollection,
	setIdeaCardCollection,
}: CardsListProps) {
	return ideaCardCollection.length === 0 ? (
		<div className='main__no-cards'>
			<p>No cards in this collection</p>
		</div>
	) : (
		ideaCardCollection.map((ideaCard) => {
			return (
				<IdeaCard
					key={ideaCard.title}
					{...{
						ideaCard,
						ideaCardCollection,
						setIdeaCardCollection,
					}}
				/>
			)
		})
	)
}
