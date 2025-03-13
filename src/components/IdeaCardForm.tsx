import { useEffect, useRef, useState } from "react"

import { IdeaCard } from "../types"
import {
	duplicatedTitleMessage,
	emptyTitleMessage,
	emptyDescriptionMessage,
} from "../lib/feedback-messages"

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

	const formRef = useRef<HTMLFormElement>(null)
	const titleRef = useRef<HTMLInputElement>(null)

	const createIdea = () => {
		// CHECK IF TITLE ALREADY EXISTS
		const duplicatedTitle = ideaCardCollection.find(
			(card) => card.title === title
		)

		if (duplicatedTitle) {
			alert(duplicatedTitleMessage)
			return
		}

		setIdeaCardCollection([...ideaCardCollection, { title, description }])

		setTitle("")
		setDescription("")

		if (titleRef.current) titleRef.current.focus() // On complete, focus on Title input
	}

	// CREATE IDEA CARD ON ENTER KEYDOWN
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (!formRef.current) return
			if (e.key == "Enter") formRef.current.requestSubmit()
		}

		document.addEventListener("keydown", handleKeyDown)

		return () => {
			document.removeEventListener("keydown", handleKeyDown)
		}
	}, [formRef])

	// FOCUS ON TITLE INPUT WHEN COLLECTION IS EMPTY
	useEffect(() => {
		if (!ideaCardCollection.length && titleRef.current) titleRef.current.focus()
	}, [ideaCardCollection])

	return (
		<div className='idea-card-form text-left'>
			<form action={createIdea} ref={formRef}>
				<input
					ref={titleRef}
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
