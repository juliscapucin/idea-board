import { Ref } from "react"

type IdeaCardProps = {
	ref: Ref<HTMLDivElement> | undefined
	title: string
	description: string
}

export default function IdeaCard({ ref, title, description }: IdeaCardProps) {
	// const [data, action] = useActionState()

	const editIdea = () => {}

	return (
		<div ref={ref} className='idea-card text-left'>
			<form action={editIdea}>
				<input
					value={title}
					type='text'
					id='title'
					name='title'
					minLength={2}
					placeholder='My Best Idea'
					required
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
				/>
				<label className='opacity-0' htmlFor='description'>
					Write a description for your idea with a maximum of 140 characters
				</label>

				<div className='idea-card__buttons'>
					<button className='button-faded'>Delete Card</button>
					<button type='submit' className='button-main'>
						Save
					</button>
				</div>
			</form>
		</div>
	)
}
