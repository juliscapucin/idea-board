import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import Flip from "gsap/Flip"

gsap.registerPlugin(Flip)

import "./App.css"

import { IdeaCard, Instructions } from "./components/"

import { IdeaCardType } from "./types"

import { incompleteCardMessage } from "./lib/feedback-messages"

function App() {
	const ideaCardRef = useRef<HTMLDivElement>(null)
	const containerRef = useRef<HTMLDivElement>(null)

	const [ideaCardCollection, setIdeaCardCollection] = useState<IdeaCardType[]>(
		[]
	)

	const createIdea = () => {
		// CHECK IF TITLE ALREADY EXISTS
		const duplicatedTitle = ideaCardCollection.find((card) => card.title === "")

		if (duplicatedTitle) {
			alert(incompleteCardMessage)
			return
		}
		if (!containerRef.current) return
		const state = Flip.getState(containerRef.current.children)

		setIdeaCardCollection([
			{
				title: "",
				description: "",
			},
			...ideaCardCollection,
		])

		requestAnimationFrame(() =>
			Flip.from(state, { duration: 0.5, ease: "power2.out" })
		)
	}

	return (
		<main className='main'>
			<h1>Idea Board</h1>
			<div className='main__header'>
				<button className='button-main' onClick={createIdea}>
					Create New Card
				</button>
				<Instructions />
			</div>
			<div ref={containerRef} className='main__desktop'>
				{ideaCardCollection.map((ideaCard) => {
					return (
						<IdeaCard
							key={ideaCard.title}
							ref={ideaCardRef}
							{...{
								ideaCard,
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
