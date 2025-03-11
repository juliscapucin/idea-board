import { useEffect, useRef, useState } from "react"

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
	const formRef = useRef<null | HTMLFormElement>(null)
	const titleRef = useRef<HTMLInputElement | null>(null)
	const descriptionRef = useRef<HTMLTextAreaElement | null>(null)

	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")

	const createIdea = () => {
		if (formRef.current) {
			setIdeaCardCollection([...ideaCardCollection, { title, description }])

			setTitle("")
			setDescription("")
		}
	}

	// useEffect(() => {
	// 	console.log("card created")
	// 	console.log(ideaCardCollection)
	// }, [ideaCardCollection])

	return (
		<div className='idea-card-form text-left'>
			<form ref={formRef} action={createIdea}>
				<input
					onChange={(e) => setTitle(e.target.value)}
					ref={titleRef}
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
					ref={descriptionRef}
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
