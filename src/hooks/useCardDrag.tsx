import { useEffect } from "react"

import gsap from "gsap"
import Flip from "gsap/Flip"
import Draggable from "gsap/Draggable"

import { IdeaCardType } from "../types"

const moveElement = (
	arr: IdeaCardType[],
	fromIndex: number,
	toIndex: number
) => {
	const newArray = [...arr] // Clone the array to avoid mutation
	const movedElement = newArray[fromIndex]
	newArray.splice(fromIndex, 1) // Remove element
	newArray.splice(toIndex, 0, movedElement) // Insert at new position

	console.log(newArray)
	return newArray
}

export default function useCardDrag(
	ideaCard: HTMLDivElement | null,
	ideaCardCollection: IdeaCardType[],
	setIdeaCardCollection: (arg: IdeaCardType[]) => void
) {
	useEffect(() => {
		if (!ideaCard || !ideaCard.parentElement) return

		gsap.registerPlugin(Draggable)
		gsap.registerPlugin(Flip)

		let isOverlapped = -1 // the index of the element that's being overlapped ('-1' means 'none')
		let isDragged = -1 // the index of the element that's being dragged ('-1' means 'none')

		const cards: HTMLDivElement[] = gsap.utils.toArray(
			ideaCard!.parentElement!.children
		)

		const ctx = gsap.context(() => {
			Draggable.create(ideaCard, {
				inertia: false,
				dragClickables: false,
				onDrag: function () {
					// do hitTests while dragging
					cards.forEach((card: HTMLDivElement, index: number) => {
						if (card === this.target) isDragged = index // define the index of the element that's being dragged
						if (this.hitTest(card, "80%")) {
							// Overlap threshold
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
						console.log("dragged: ", isDragged, "overlapped: ", isOverlapped)
						if (isDragged < isOverlapped) {
							cards[isOverlapped].insertAdjacentElement("afterend", this.target)
						} else {
							cards[isOverlapped].insertAdjacentElement(
								"beforebegin",
								this.target
							)
						}

						if (state) {
							requestAnimationFrame(() => {
								Flip.from(state, { duration: 0.5, ease: "power2.out" })
							})
						}

						// REMOVE DRAG TRANSFORMS
						gsap.set(this.target, {
							x: 0,
							y: 0,
							duration: 0.3,
						})

						// EDIT ORDER IN DATA ARRAY
						const newIdeaCardOrder = moveElement(
							ideaCardCollection,
							isDragged,
							isOverlapped
						)
						setIdeaCardCollection(newIdeaCardOrder)

						// RESET INDEXES
						isDragged = -1
						isOverlapped = -1

						// REMOVE HIGHLIGHT
						cards.forEach((card) => {
							if (card.classList.contains("highlight"))
								card.classList.remove("highlight")
						})
					} else {
						console.log("dragged: ", isDragged, "overlapped: ", isOverlapped)

						// IF DRAG DOESN'T HIT ANY TARGET, MOVE BACK TO ORIGINAL POSITION
						gsap.to(this.target, {
							x: 0,
							y: 0,
							duration: 0.3,
						})

						isDragged = -1
						isOverlapped = -1
					}
				},
			})
		})

		return () => ctx.revert()
	}, [ideaCard])
}
