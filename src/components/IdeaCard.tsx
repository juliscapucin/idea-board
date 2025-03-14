import { Ref, useEffect, useRef, useState } from "react"

import { IdeaCardType } from "../types"

import { duplicatedTitleMessage } from "../lib/feedback-messages"
import { getDateAndTime } from "../lib/utils"

type IdeaCardProps = {
	ref: Ref<HTMLDivElement> | undefined
	ideaCard: IdeaCardType
	ideaCardCollection: IdeaCardType[]
	setIdeaCardCollection: (newCollection: IdeaCardType[]) => void
}

export default function IdeaCard({
	ref,
	ideaCard,
	ideaCardCollection,
	setIdeaCardCollection,
}: IdeaCardProps) {
	const { title, description, dateCreated, dateEdited } = ideaCard

	const [newTitle, setNewTitle] = useState(title)
	const [newDescription, setNewDescription] = useState(description)
	const [characterCount, setCharacterCount] = useState(0)
	const [isEditing, setIsEditing] = useState(false)

	const titleRef = useRef<HTMLInputElement>(null)

	const saveIdea = () => {
		const cardToEdit = ideaCardCollection.find(
			(card) => card.title === title || card.description === description
		)

		if (!cardToEdit) return

		const cardToEditIndex = ideaCardCollection.indexOf(cardToEdit)

		let editedCard: IdeaCardType

		const formattedDate = getDateAndTime()

		// If dateCreated exists, set Edited Date
		if (dateCreated) {
			editedCard = {
				title: newTitle,
				description: newDescription,
				dateCreated,
				dateEdited: formattedDate,
			}
		} else {
			// If dateCreated doesn't exist, set Created Date
			editedCard = {
				title: newTitle,
				description: newDescription,
				dateCreated: formattedDate,
				dateEdited: undefined,
			}
		}

		// CHECK FOR DUPLICATED TITLE
		if (
			title !== newTitle && // if Title has been edited
			ideaCardCollection.find((card) => card.title === editedCard.title)
		) {
			alert(duplicatedTitleMessage)
			setNewTitle(title) // if new title exists, revert to original title
			titleRef.current && titleRef.current.focus()
		} else {
			// CREATE A NEW ARRAY WITH UPDATED DATA
			const updatedCollection = [...ideaCardCollection]
			updatedCollection[cardToEditIndex] = editedCard

			setIdeaCardCollection(updatedCollection)
			setIsEditing(false)
		}
	}

	const deleteIdea = (title: string) => {
		// const state = Flip.getState(containerRef.current.children)

		const updatedCollection = ideaCardCollection.filter((card) => {
			if (card.title !== title) return card
		})

		setIdeaCardCollection(updatedCollection)
	}

	// If it's a fresh card, focus on Title input
	useEffect(() => {
		if (!dateCreated && titleRef.current) titleRef.current.focus()
	}, [])

	useEffect(() => {
		setCharacterCount(newDescription.length)
	}, [newDescription])

	return (
		<div ref={ref} className='idea-card'>
			<form action={saveIdea}>
				<div className='idea-card__form-section'>
					<label
						className={`${dateCreated ? "opacity-0" : "opacity-1"}`}
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
						placeholder='My Best Idea'
						required
						onFocus={() => console.log("focus")}
						onChange={(e) => {
							setNewTitle(e.target.value)
							setIsEditing(true)
						}}
					/>
				</div>

				<div>
					<label
						className={`${dateCreated ? "opacity-0" : "opacity-1"}`} // if already saved once, no need for labels
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
							setIsEditing(true)
						}}
					/>
					<p className='idea-card__countdown'>
						{characterCount} of 140 characters
					</p>
				</div>

				<div className='idea-card__buttons'>
					<button onClick={() => deleteIdea(title)} className='button-faded'>
						Delete Card
					</button>
					{isEditing && (
						<button type='submit' className='button-main'>
							Save
						</button>
					)}
				</div>
				<div>
					{dateEdited && <p>Last edited on: {dateEdited}</p>}
					{dateCreated && <p>Created on: {dateCreated}</p>}
				</div>
			</form>
		</div>
	)
}
