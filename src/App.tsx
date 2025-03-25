"use client"

import { useEffect, useRef, useState } from "react"

import Flip from "gsap/Flip"

import { CardsList, Header } from "./components/"
import { incompleteCardMessage } from "./lib/alert-messages"

import { SortContextProvider } from "./context"

import { IdeaCard } from "./types"

function App() {
	const containerRef = useRef<HTMLDivElement>(null)
	const flipStateRef = useRef<ReturnType<typeof Flip.getState>>(null)

	const [ideaCardCollection, setIdeaCardCollection] = useState<IdeaCard[]>([])

	const createNewIdea = () => {
		// CHECK IF EMPTY CARD ALREADY EXISTS
		const duplicatedTitle = ideaCardCollection.find((card) => card.title === "")

		if (duplicatedTitle) {
			alert(incompleteCardMessage)
			return
		}
		if (!containerRef.current) return
		flipStateRef.current = Flip.getState(containerRef.current.children)

		setIdeaCardCollection([
			{
				id: crypto.randomUUID(), // needs to be UNIQUE and STABLE to be used as key
				title: "",
				description: "",
				dateCreated: null,
				dateUpdated: null,
			},
			...ideaCardCollection,
		])
	}

	// FLIP ANIMATION
	useEffect(() => {
		if (!flipStateRef.current) return

		Flip.from(flipStateRef.current!, {
			duration: 0.5,
			ease: "power2.out",
			onComplete: () => (flipStateRef.current = null),
		})
	}, [ideaCardCollection])

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
			<SortContextProvider>
				<Header
					{...{
						ideaCardCollection,
						setIdeaCardCollection,
						createNewIdea,
						cardsContainer: containerRef.current,
					}}
				/>
				{/* CARDS LIST */}
				<div ref={containerRef} className='cards-list__container'>
					<CardsList
						{...{
							ideaCardCollection,
							setIdeaCardCollection,
						}}
					/>
				</div>
			</SortContextProvider>
		</main>
	)
}

export default App
