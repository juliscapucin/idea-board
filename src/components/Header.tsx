import { SortMenu, InstructionsPopup } from "../components"
import { Button } from "./Buttons"

import { IdeaCard } from "../types"

type HeaderProps = {
	ideaCardCollection: IdeaCard[]
	setIdeaCardCollection: (arg: IdeaCard[]) => void
	createNewIdea: () => void
}

export default function Header({
	ideaCardCollection,
	setIdeaCardCollection,
	createNewIdea,
}: HeaderProps) {
	return (
		<div className='header'>
			<InstructionsPopup />
			<h1 className='header__title'>Idea Board</h1>
			<div className='header__buttons'>
				<Button variant='primary' onClickAction={createNewIdea}>
					Add Card
				</Button>

				{/* SORT DROPDOWN */}
				<SortMenu
					{...{
						ideaCardCollection,
						setIdeaCardCollection,
					}}
				/>
			</div>
		</div>
	)
}
