import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import Flip from "gsap/Flip"

import { DropDownMenu, IdeaCard, Instructions } from "./components/"

import { IdeaCardType } from "./types"

import { incompleteCardMessage } from "./lib/feedback-messages"
import { Button } from "./components/Buttons"

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
			},
			...ideaCardCollection,
		])

		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				Flip.from(state, { duration: 0.5, ease: "power2.out" })
			})
		})
	}

	const sort = (option: string) => {
		if (!containerRef.current) return

		gsap.registerPlugin(Flip)

		const state = Flip.getState(containerRef.current.children)
		const sortedCollection = [...ideaCardCollection].sort((a, b) => {
			if (option === "dateCreatedRaw" && a.dateCreatedRaw && b.dateCreatedRaw) {
				return a.dateCreatedRaw - b.dateCreatedRaw
			} else if (option === "title" && a.title && b.title) {
				if (a.title < b.title) {
					return -1
				} else if (a.title > b.title) {
					return 1
				} else {
					return 0
				}
			}
			return 0
		})
		setIdeaCardCollection(sortedCollection)
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				Flip.from(state, { duration: 0.5, ease: "power2.out" })
			})
		})
	}

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

	useEffect(() => {
		const getLocalStorage = localStorage.getItem("ideaCardCollection")
		getLocalStorage && setIdeaCardCollection(JSON.parse(getLocalStorage))
	}, [])

	return (
		<main className='main'>
			<div className='main__header'>
				<Instructions />
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
					<DropDownMenu {...{ sort }} />
				</div>
			</div>
			{/* CARDS LIST */}
			<div ref={containerRef} className='main__cards-container'>
				{ideaCardCollection.length === 0 ? (
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
				)}
			</div>
		</main>
	)
}

export default App
