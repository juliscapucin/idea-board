import { useEffect, useRef, useState } from "react"

import gsap from "gsap"
import Flip from "gsap/Flip"
import Draggable from "gsap/Draggable"

gsap.registerPlugin(Flip)

import { IdeaCardType } from "../types"

import { duplicatedTitleMessage } from "../lib/feedback-messages"
import { formatDateAndTime } from "../lib/utils"

type IdeaCardProps = {
	ideaCard: IdeaCardType
	ideaCardCollection: IdeaCardType[]
	setIdeaCardCollection: (newCollection: IdeaCardType[]) => void
}

export default function IdeaCard({
	ideaCard,
	ideaCardCollection,
	setIdeaCardCollection,
}: IdeaCardProps) {
	const { title, description, dateCreated, dateCreatedRaw, dateEdited } =
		ideaCard

	const isSaved = dateCreated ? true : false

	const [newTitle, setNewTitle] = useState(title)
	const [newDescription, setNewDescription] = useState(description)
	const [characterCount, setCharacterCount] = useState(0)
	const [isEditingTitle, setIsEditingTitle] = useState(false)
	const [isEditingDescription, setIsEditingDescription] = useState(false)

	const ideaCardRef = useRef<HTMLDivElement>(null)
	const titleRef = useRef<HTMLInputElement>(null)

	const saveIdea = () => {
		const cardToEdit = ideaCardCollection.find(
			(card) => card.title === title || card.description === description
		)

		if (!cardToEdit) return

		const cardToEditIndex = ideaCardCollection.indexOf(cardToEdit)

		let editedCard: IdeaCardType

		// If saved previously, set Edited Date
		if (isSaved) {
			editedCard = {
				title: newTitle,
				description: newDescription,
				dateCreated,
				dateCreatedRaw,
				dateEdited: formatDateAndTime(),
			}
		} else {
			// If not saved previously, set Created Date
			editedCard = {
				title: newTitle,
				description: newDescription,
				dateCreated: formatDateAndTime(),
				dateCreatedRaw: Date.now(),
				dateEdited: undefined,
			}
		}

		// CHECK FOR DUPLICATED TITLE
		if (
			title !== newTitle && // if Title has been edited
			ideaCardCollection.find(
				(card) => card.title.toLowerCase() === editedCard.title.toLowerCase()
			)
		) {
			alert(duplicatedTitleMessage)
			setNewTitle(title) // if new title exists, revert to original title
			titleRef.current && titleRef.current.focus()
		} else {
			// CREATE A NEW ARRAY WITH UPDATED DATA
			const updatedCollection = [...ideaCardCollection]
			updatedCollection[cardToEditIndex] = editedCard

			setIdeaCardCollection(updatedCollection)

			setIsEditingTitle(false)
			setIsEditingDescription(false)
		}
	}

	const deleteIdea = (title: string) => {
		let state

		// if (ideaCardRef.current && ideaCardRef.current.parentElement) {
		// 	state = Flip.getState(ideaCardRef.current.parentElement.children)
		// }

		const updatedCollection = ideaCardCollection.filter((card) => {
			if (card.title !== title) return card
		})

		setIdeaCardCollection(updatedCollection)

		// if (state)
		// 	requestAnimationFrame(() =>
		// 		Flip.from(state, { duration: 0.5, ease: "power2.out" })
		// 	)
	}

	useEffect(() => {
		if (!isSaved && titleRef.current) titleRef.current.focus() // If it's a fresh card, focus on Title input
	}, [])

	// CHARACTER COUNT
	useEffect(() => {
		setCharacterCount(newDescription.length)
	}, [newDescription])

	// SAVE NEW / UPDATED COLLECTION TO LOCAL STORAGE
	useEffect(() => {
		localStorage.setItem(
			"ideaCardCollection",
			JSON.stringify(ideaCardCollection)
		)
	}, [ideaCardCollection])

	// DRAGGABLE
	useEffect(() => {
		if (!ideaCardRef.current) return

		gsap.registerPlugin(Draggable)

		const ctx = gsap.context(() => {
			Draggable.create(ideaCardRef.current, {
				// bounds: "screen",
				inertia: false,
			})
		})

		return () => ctx.revert()
	}, [ideaCardRef])

	return (
		<div ref={ideaCardRef} className='idea-card'>
			<div>
				<div className='idea-card__form-section'>
					<label
						className={`${isSaved ? "opacity-0" : "opacity-1"}`}
						htmlFor='title'
					>
						Idea title
					</label>
					<input
						ref={titleRef}
						value={newTitle}
						type='text'
						id='title'
						name='title'
						minLength={2}
						maxLength={50}
						placeholder='My Best Idea'
						required
						onFocus={() => console.log("focus")}
						onChange={(e) => {
							setNewTitle(e.target.value)
							setIsEditingTitle(true)
						}}
					/>
				</div>

				<div>
					<label
						className={`${isSaved ? "opacity-0" : "opacity-1"}`} // if already saved once, no need for labels
						htmlFor='description'
					>
						Description
					</label>
					<textarea
						value={newDescription}
						id='description'
						name='description'
						placeholder='Idea description here'
						minLength={2}
						maxLength={140}
						rows={3}
						required
						onChange={(e) => {
							setNewDescription(e.target.value)
							setIsEditingDescription(true)
						}}
					/>

					<p
						className={`idea-card__countdown ${
							// Show character count if user is editing description
							isEditingDescription ? "opacity-1" : "opacity-0"
						}`}
					>
						{characterCount} of 140 characters
					</p>
				</div>

				<div className='idea-card__buttons'>
					<button onClick={() => deleteIdea(title)} className='button-faded'>
						Delete Card
					</button>
					{(isEditingTitle || isEditingDescription) && (
						<button onClick={saveIdea} className='button-main'>
							Save
						</button>
					)}
				</div>
				<div>
					{dateEdited && <p>Last edited on: {dateEdited}</p>}
					{dateCreated && <p>Created on: {dateCreated}</p>}
				</div>
			</div>
		</div>
	)
}
