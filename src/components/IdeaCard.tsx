import { Ref, useState } from "react"

import { IdeaCard as IdeaCardType } from "../types"

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
	const [newTitle, setNewTitle] = useState("")
	const [newDescription, setNewDescription] = useState("")

	const editIdea = (inputType: string) => {
		const cardToEdit =
			inputType === "title"
				? ideaCardCollection.find((card) => card.title === title)
				: ideaCardCollection.find((card) => card.description === description)

		console.log(cardToEdit)

		// setIdeaCardCollection([...ideaCardCollection, { title, description }])
	}

	const saveIdea = () => {}

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
					value={title}
					type='text'
					id='title'
					name='title'
					minLength={2}
					placeholder='My Best Idea'
					required
					onChange={(e) => setNewTitle(e.target.value)}
				/>
				<label className='opacity-0' htmlFor='title'>
					Idea title
				</label>

				<textarea
					value={description}
					id='description'
					name='description'
					placeholder='Idea description here'
					minLength={2}
					maxLength={140}
					rows={3}
					required
					onChange={(e) => setNewDescription(e.target.value)}
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
			</form>
		</div>
	)
}
