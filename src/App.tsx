"use client"

import { useEffect, useRef, useState } from "react"

import { CardsList, Header } from "./components/"
import { incompleteCardMessage } from "./lib/alert-messages"

import { SortContextProvider } from "./context"

import { IdeaCard } from "./types"
import { saveToLocalStorage } from "./lib/utils"

function App() {
	const [isFirstLoad, setIsFirstLoad] = useState(true)

	const containerRef = useRef<HTMLDivElement>(null)

	const [ideaCardCollection, setIdeaCardCollection] = useState<IdeaCard[]>([])

	const createNewIdea = () => {
		// CHECK IF EMPTY CARD ALREADY EXISTS
		const duplicatedTitle = ideaCardCollection.find((card) => card.title === "")

		if (duplicatedTitle) {
			alert(incompleteCardMessage)
			return
		}

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

	// SAVE TO LOCAL STORAGE + TOAST ON EVERY COLLECTION UPDATE
	useEffect(() => {
		if (isFirstLoad) return

		saveToLocalStorage(ideaCardCollection)
	}, [ideaCardCollection, isFirstLoad])

	// RETRIEVE CARDS FROM LOCAL STORAGE
	useEffect(() => {
		const cards = localStorage.getItem("ideaCardCollection")
		cards && setIdeaCardCollection(JSON.parse(cards))

		setIsFirstLoad(false)
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
					ideaCardCollection={ideaCardCollection}
					setIdeaCardCollection={setIdeaCardCollection}
					createNewIdea={createNewIdea}
				/>
				{/* CARDS LIST */}
				<div ref={containerRef} className='cards-list__container'>
					<CardsList
						ideaCardCollection={ideaCardCollection}
						setIdeaCardCollection={setIdeaCardCollection}
					/>
				</div>
			</SortContextProvider>
		</main>
	)
}

export default App
