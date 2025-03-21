import { useEffect, useState } from "react"

import gsap from "gsap"
import Flip from "gsap/Flip"
import Draggable from "gsap/Draggable"

import { IdeaCardType } from "../types"
import { saveToLocalStorage } from "../lib/utils"

const moveElement = (
	arr: IdeaCardType[],
	fromIndex: number,
	toIndex: number
) => {
	if (
		fromIndex < 0 ||
		toIndex < 0 ||
		fromIndex >= arr.length ||
		toIndex >= arr.length
	) {
		console.warn("Invalid indices:", { fromIndex, toIndex })
		return arr // Return original array if indices are invalid
	}

	const newArray = [...arr] // Clone the array to avoid mutation
	const movedElement = { ...newArray[fromIndex] } // Clone the moved element

	newArray.splice(fromIndex, 1) // Remove element
	newArray.splice(toIndex, 0, movedElement) // Insert at new position

	return newArray
}

export default function useCardDrag(
	ideaCard: HTMLDivElement | null,
	ideaCardCollection: IdeaCardType[],
	setIdeaCardCollection: (arg: IdeaCardType[]) => void
) {
	const [cards, setCards] = useState<Element[] | null>(null)

	useEffect(() => {
		if (!ideaCard || !ideaCard.parentElement) return
		console.log("set cards")
		setCards([...ideaCard!.parentElement!.children])
	}, [ideaCardCollection])

	useEffect(() => {
		if (!cards) return

		gsap.registerPlugin(Draggable)
		gsap.registerPlugin(Flip)

		let isOverlapped = -1 // the index of the element that's being overlapped ('-1' means 'none')
		let isDragged = -1 // the index of the element that's being dragged ('-1' means 'none')

		const ctx = gsap.context(() => {
			Draggable.create(ideaCard, {
				inertia: false,
				dragClickables: false,
				onDrag: function () {
					// do hitTests while dragging
					cards.forEach((card: Element, index: number) => {
						if (card === this.target) isDragged = index // define the index of the element that's being dragged
						// hitTest + overlap threshold
						if (this.hitTest(card, "80%")) {
							card.classList.add("highlight")
							isOverlapped = index // define the index of the element that's being overlapped
						} else {
							if (card.classList.contains("highlight"))
								card.classList.remove("highlight")
						}
					})
				},
				onRelease: function () {
					const state = Flip.getState(cards)

					// IF DRAG HITS ANY TARGET
					if (isOverlapped >= 0) {
						if (isDragged > isOverlapped)
							cards[isOverlapped].insertAdjacentElement(
								"beforebegin",
								this.target
							)
						else
							cards[isOverlapped].insertAdjacentElement("afterend", this.target)

						if (state) {
							requestAnimationFrame(() => {
								Flip.from(state, {
									duration: 0.5,
									ease: "power2.out",
									onComplete: () => {
										// SAVE REORDERED ARRAY
										setIdeaCardCollection(newIdeaCardOrder)
										saveToLocalStorage(newIdeaCardOrder)
									},
								})
							})
						}

						// REMOVE DRAG TRANSFORMS
						gsap.set(this.target, {
							x: 0,
							y: 0,
						})

						// REMOVE HIGHLIGHT
						cards.forEach((card) => {
							if (card.classList.contains("highlight"))
								card.classList.remove("highlight")
						})

						// EDIT ORDER IN DATA ARRAY
						const newIdeaCardOrder = moveElement(
							ideaCardCollection,
							isDragged,
							isOverlapped
						)

						// RESET INDEXES
						isDragged = -1
						isOverlapped = -1
					} else {
						// IF DRAG DOESN'T HIT ANY TARGET, MOVE BACK TO ORIGINAL POSITION
						gsap.to(this.target, {
							x: 0,
							y: 0,
							duration: 0.3,
						})

						if (!ideaCard || !ideaCard.parentElement) return
						// cards = [...ideaCard!.parentElement!.children]

						isDragged = -1
						isOverlapped = -1
					}
				},
			})
		})

		return () => ctx.revert()
	}, [cards])
}
