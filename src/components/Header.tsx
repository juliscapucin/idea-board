import { SortMenu, InstructionsPopup } from "../components"
import { Button } from "./Buttons"

import { IdeaCardType } from "../types"

type HeaderProps = {
	ideaCardCollection: IdeaCardType[]
	setIdeaCardCollection: (arg: IdeaCardType[]) => void
	createNewIdea: () => void
	cardsContainer: HTMLDivElement | null
}

export default function Header({
	ideaCardCollection,
	setIdeaCardCollection,
	createNewIdea,
	cardsContainer,
}: HeaderProps) {
	return (
		<div className='main__header'>
			<InstructionsPopup />
			<h1 className='main__title'>Idea Board</h1>
			<div className='main__buttons'>
				<Button
					variant='primary'
					classes='button-main'
					onClickAction={createNewIdea}
				>
					Create New Card
				</Button>

				{/* SORT DROPDOWN */}
				<SortMenu
					{...{
						container: cardsContainer,
						ideaCardCollection,
						setIdeaCardCollection,
					}}
				/>
			</div>
		</div>
	)
}
