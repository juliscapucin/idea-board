import { DropDownMenu, InstructionsPopup } from "../components"
import { Button } from "./Buttons"

import { IdeaCardType } from "../types"

type HeaderProps = {
	ideaCardCollection: IdeaCardType[]
	setIdeaCardCollection: (arg: IdeaCardType[]) => void
	createNewIdea: () => void
	cardsContainer: HTMLDivElement | null
	flipState: ReturnType<typeof Flip.getState> | null
}

export default function Header({
	ideaCardCollection,
	setIdeaCardCollection,
	createNewIdea,
	cardsContainer,
	flipState,
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

				<DropDownMenu
					{...{
						container: cardsContainer,
						ideaCardCollection,
						setIdeaCardCollection,
						flipState,
					}}
				/>
			</div>
		</div>
	)
}
