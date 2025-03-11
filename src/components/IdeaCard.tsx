import { useActionState, useRef } from "react"

export default function IdeaCard() {
	// const [data, action] = useActionState()
	const formRef = useRef<null | HTMLFormElement>(null)

	const createIdea = () => {
		if (formRef.current) {
			const inputs = formRef.current.querySelectorAll("input")

			inputs.forEach((input) => {
				input.value = ""
			})
		}
	}

	return (
		<div className='idea-card text-left'>
			<form ref={formRef} action={createIdea}>
				<input
					type='text'
					id='title'
					name='title'
					minLength={2}
					placeholder='My Best Idea'
					required
				/>
				<label htmlFor='title'>Idea title</label>

				<textarea
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

				<button type='submit'>Create Idea</button>
			</form>
		</div>
	)
}
