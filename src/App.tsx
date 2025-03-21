import { useEffect, useRef, useState } from "react"

import Flip from "gsap/Flip"

import { CardsList, Header } from "./components/"

import { IdeaCardType } from "./types"

import { incompleteCardMessage } from "./lib/feedback-messages"

function App() {
	const containerRef = useRef<HTMLDivElement>(null)

	const [ideaCardCollection, setIdeaCardCollection] = useState<IdeaCardType[]>(
		[]
	)

	const createNewIdea = () => {
		// CHECK IF EMPTY CARD ALREADY EXISTS
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
				dateCreated: null,
				dateCreatedRaw: null,
				dateEdited: null,
			},
			...ideaCardCollection,
		])

		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				Flip.from(state, {
					duration: 0.5,
					ease: "power2.out",
				})
			})
		})
	}

	// RETRIEVE CARDS FROM LOCAL STORAGE
	useEffect(() => {
		const getLocalStorage = localStorage.getItem("ideaCardCollection")
		getLocalStorage && setIdeaCardCollection(JSON.parse(getLocalStorage))
	}, [])

	//TODO CREATE IDEA CARD ON ENTER KEYDOWN
	// useEffect(() => {
	// 	const handleKeyDown = (e: KeyboardEvent) => {
	// 		if (e.key == "Enter") createIdea()
	// 	}

	// 	document.addEventListener("keydown", handleKeyDown)

	// 	return () => {
	// 		document.removeEventListener("keydown", handleKeyDown)
	// 	}
	// }, [])

	return (
		<main className='main'>
			<Header
				{...{
					ideaCardCollection,
					setIdeaCardCollection,
					createNewIdea,
					cardsContainer: containerRef.current,
				}}
			/>
			{/* CARDS LIST */}
			<div ref={containerRef} className='main__cards-container'>
				<CardsList
					{...{
						ideaCardCollection,
						setIdeaCardCollection,
					}}
				/>
			</div>
		</main>
	)
}

export default App
