import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import Flip from "gsap/Flip"

gsap.registerPlugin(Flip)

import "./App.css"

import { IdeaCard, Instructions } from "./components/"

import { IdeaCard as IdeaCardType } from "./types"

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
			{ title: "", description: "" },
			...ideaCardCollection,
		])

		requestAnimationFrame(() =>
			Flip.from(state, { duration: 0.5, ease: "power2.out" })
		)
	}

	useEffect(() => {
		const ctx = gsap.context(() => {
			if (containerRef.current) {
				const cards = containerRef.current.children
				if (cards.length > 0) {
					// Animate the first (newest) card
					gsap.fromTo(
						cards[0],
						{ opacity: 0, y: -20, scale: 0.9 },
						{ opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power2.out" }
					)
				}
			}
		})

		return () => ctx.revert() // Clean up animations on unmount
	}, [ideaCardCollection])

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
