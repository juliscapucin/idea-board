import { useEffect, useState } from "react"

import gsap from "gsap"
import Flip from "gsap/Flip"
import Draggable from "gsap/Draggable"

import { IdeaCardType } from "../types"
import { saveToLocalStorage } from "../lib/utils"
import { useSortMenuContext } from "../context"

const moveElement = (
	array: IdeaCardType[],
	fromIndex: number,
	toIndex: number
) => {
	const newArray = [...array] // Clone the array to avoid mutation
	const movedElement = { ...newArray[fromIndex] } // Clone the moved element

	newArray.splice(fromIndex, 1) // Remove element
	newArray.splice(toIndex, 0, movedElement) // Insert at new position

	return newArray
}

export default function useCardDrag(
	ideaCardRef: React.RefObject<HTMLDivElement | null>,
	ideaCardCollection: IdeaCardType[],
	setIdeaCardCollection: (arg: IdeaCardType[]) => void,
	isNewCard: boolean,
	showAlert: boolean
) {
	const [cards, setCards] = useState<Element[] | null>(null)
	const [ideaCard, setIdeaCard] = useState<Element | null>(null)

	const { setSortChoice } = useSortMenuContext() // To change sort menu when user drags a card

	// WAIT UNTIL THE REF + CARD DATA BECOME AVAILABLE
	useEffect(() => {
		if (
			!isNewCard &&
			ideaCardRef.current &&
			ideaCardRef.current.parentElement
		) {
			setIdeaCard(ideaCardRef.current)
			setCards([...ideaCardRef.current.parentElement.children])
		}
	}, [isNewCard])

	useEffect(() => {
		if (!cards || !ideaCard || showAlert) return

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
					setSortChoice("") // Reset sort menu

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

						// EDIT ORDER IN DATA ARRAY
						const newIdeaCardOrder = moveElement(
							ideaCardCollection,
							isDragged,
							isOverlapped
						)

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
