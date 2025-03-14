import { Ref, useRef, useState } from "react"

import { IdeaCard as IdeaCardType } from "../types"

import { duplicatedTitleMessage } from "../lib/feedback-messages"

type IdeaCardProps = {
	ref: Ref<HTMLDivElement> | undefined
	title: string
	description: string
	ideaCardCollection: IdeaCardType[]
	setIdeaCardCollection: (newCollection: IdeaCardType[]) => void
}

export default function IdeaCard({
	ref,
	title,
	description,
	ideaCardCollection,
	setIdeaCardCollection,
}: IdeaCardProps) {
	const [newTitle, setNewTitle] = useState(title)
	const [newDescription, setNewDescription] = useState(description)

	const titleRef = useRef<HTMLInputElement>(null)

	const saveIdea = () => {
		const cardToEdit = ideaCardCollection.find(
			(card) => card.title === title || card.description === description
		)

		if (!cardToEdit) return

		const cardToEditIndex = ideaCardCollection.indexOf(cardToEdit)

		const editedCard = { title: newTitle, description: newDescription }

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
		}
	}

	const deleteIdea = (title: string) => {
		const updatedIdeaCardCollection = ideaCardCollection.filter((card) => {
			if (card.title !== title) return card
		})

		setIdeaCardCollection(updatedIdeaCardCollection)
	}

	return (
		<div ref={ref} className='idea-card text-left'>
			<form action={saveIdea}>
				<input
					ref={titleRef}
					value={newTitle}
					type='text'
					id='title'
					name='title'
					minLength={2}
					placeholder='My Best Idea'
					required
					onChange={(e) => {
						setNewTitle(e.target.value)
					}}
				/>
				<label className='opacity-0' htmlFor='title'>
					Idea title
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
					}}
				/>
				<label className='opacity-0' htmlFor='description'>
					Write a description for your idea with a maximum of 140 characters
				</label>

				<div className='idea-card__buttons'>
					<button onClick={() => deleteIdea(title)} className='button-faded'>
						Delete Card
					</button>
					<button type='submit' className='button-main'>
						Save
					</button>
				</div>
				<div>
					<p>Edited on:</p>
					<p>First saved on:</p>
				</div>
			</form>
		</div>
	)
}
