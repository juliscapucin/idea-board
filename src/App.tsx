import { useRef, useState } from "react"

import "./App.css"

import { IdeaCard, IdeaCardForm, Instructions } from "./components/"

import { IdeaCard as IdeaCardType } from "./types"

function App() {
	const ideaCardFormRef = useRef<HTMLDivElement | null>(null)

	const [ideaCardCollection, setIdeaCardCollection] = useState<IdeaCardType[]>(
		[]
	)

	return (
		<main className='main'>
			<h1>Idea Board</h1>
			<Instructions />
			<div className='main__desktop'>
				<IdeaCardForm {...{ ideaCardCollection, setIdeaCardCollection }} />
				{ideaCardCollection.map((ideaCard) => {
					return (
						<IdeaCard
							key={ideaCard.title}
							ref={ideaCardFormRef}
							{...{
								title: ideaCard.title,
								description: ideaCard.description,
								ideaCardCollection,
								setIdeaCardCollection,
							}}
						/>
					)
				})}
			</div>
		</main>
	)
}

export default App
