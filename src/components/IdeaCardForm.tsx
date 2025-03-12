import { useState } from "react"

import { IdeaCard } from "../types"

type IdeaCardFormProps = {
	ideaCardCollection: IdeaCard[]
	setIdeaCardCollection: (newCollection: IdeaCard[]) => void
}

export default function IdeaCardForm({
	ideaCardCollection,
	setIdeaCardCollection,
}: IdeaCardFormProps) {
	// const [data, action] = useActionState()

	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")

	const createIdea = () => {
		// CHECK IF TITLE ALREADY EXISTS
		const duplicatedTitle = ideaCardCollection.find(
			(card) => card.title === title
		)

		if (duplicatedTitle) {
			alert("This title already exists. You must have unique titles.")
			return
		}

		setIdeaCardCollection([...ideaCardCollection, { title, description }])

		setTitle("")
		setDescription("")
	}

	return (
		<div className='idea-card-form text-left'>
			<form action={createIdea}>
				<input
					onChange={(e) => setTitle(e.target.value)}
					type='text'
					id='title'
					name='title'
					minLength={2}
					placeholder='My Best Idea'
					required
				/>
				<label htmlFor='title'>Idea title</label>

				<textarea
					onChange={(e) => setDescription(e.target.value)}
					id='description'
					name='description'
					placeholder='Idea description here'
					minLength={2}
					maxLength={140}
					rows={3}
					required
				/>
				<label htmlFor='description'>
					Write a description for your idea with a maximum of 140 characters
				</label>

				<div className='idea-card-form__button'>
					<button className='button-main' type='submit'>
						Create Card
					</button>
				</div>
			</form>
		</div>
	)
}
