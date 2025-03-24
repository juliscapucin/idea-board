type CharacterCountdownProps = {
	isEditingDescription: boolean
	newDescription: string
}

export default function CharacterCountdown({
	isEditingDescription,
	newDescription,
}: CharacterCountdownProps) {
	const charactersLeft = 140 - newDescription.length
	return (
		<p
			className={`character-countdown ${
				// Show character count if user is editing description
				isEditingDescription ? "opacity-1" : "opacity-0"
			} ${charactersLeft <= 10 && "color-danger"}`}
		>
			{charactersLeft} left of 140 characters
		</p>
	)
}
