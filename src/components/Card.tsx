import { useEffect, useRef, useState } from "react"

import { IdeaCard } from "../types"

import { formatDateAndTime } from "../lib/utils"
import { Alert, CharacterCountdown, Toast } from "../components"
import { Button, ButtonClose } from "./Buttons"
import { useSortMenuContext } from "../context"
import { saveIdea } from "../lib/saveIdea"

type IdeaCardProps = {
	ideaCard: IdeaCard
	ideaCardCollection: IdeaCard[]
	setIdeaCardCollection: (newCollection: IdeaCard[]) => void
}

export default function Card({
	ideaCard,
	ideaCardCollection,
	setIdeaCardCollection,
}: IdeaCardProps) {
	const { id, title, description, dateCreated, dateUpdated } = ideaCard

	const [newTitle, setNewTitle] = useState(title)
	const [newDescription, setNewDescription] = useState(description)
	const [showToast, setShowToast] = useState(false)
	const [alertMessage, setAlertMessage] = useState<string | null>(null)

	const isEditingDescription = description === newDescription ? false : true
	const isEditingTitle = title === newTitle ? false : true

	const ideaCardRef = useRef<HTMLDivElement | null>(null)
	const titleRef = useRef<HTMLInputElement>(null)

	const isNewCard = dateCreated ? false : true // If it has a dateCreated value, it's not a new card

	const { setSortChoice } = useSortMenuContext()

	const handleSaveIdea = () => {
		setSortChoice("") // Reset sort menu

		const result = saveIdea({
			id,
			newTitle,
			newDescription,
			collection: ideaCardCollection,
			dateCreated,
			title,
			description,
		})

		if (result.status === "error") {
			setAlertMessage(result.message)
			setNewTitle(title) // Revert title if invalid
			return
		}

		setIdeaCardCollection(result.updatedCollection)
		setShowToast(true)
	}

	const deleteIdea = (title: string) => {
		if (!ideaCardRef.current || !ideaCardRef.current.parentElement) return

		const updatedCollection = ideaCardCollection.filter((card) => {
			if (card.title !== title) return card
		})

		setIdeaCardCollection(updatedCollection)
	}

	// TITLE FOCUS ON NEW CARD
	useEffect(() => {
		if (isNewCard && titleRef.current) titleRef.current.focus()
	}, [titleRef])

	// TODO: SAVE ON CLICK OUTSIDE
	// useEffect(() => {
	// 	if (
	// 		!ideaCardRef.current ||
	// 		showAlert || // If handling an error alert
	// 		(!isEditingTitle && !isEditingDescription)
	// 	)
	// 		return

	// 	const saveOnClickOutside = (e: MouseEvent) => {
	// 		if (!ideaCardRef.current!.contains(e.target as Node)) {
	// 			saveIdea()
	// 		}
	// 	}

	// 	document.addEventListener("click", saveOnClickOutside)

	// 	return () => document.removeEventListener("click", saveOnClickOutside)
	// }, [isEditingDescription, isEditingTitle])

	return (
		<div ref={ideaCardRef} className='card'>
			<Alert
				{...{
					alertMessage,
					setAlertMessage,
					titleRef: titleRef.current,
				}}
			/>
			<ButtonClose
				classes={"card__close-button"}
				onClickAction={() => deleteIdea(title)}
				iconColor='faded-dark'
			/>
			<div className='card__fields'>
				<label
					className={`card__input-label ${
						isNewCard ? "opacity-1" : "opacity-0"
					}`}
					htmlFor={`title-${title}`}
				>
					Idea title
				</label>
				<input
					className='card__title'
					ref={titleRef}
					value={newTitle}
					id={`title-${title}`}
					name={`title-${title}`}
					placeholder='My Best Idea'
					minLength={2}
					maxLength={50}
					type='text'
					required
					onChange={(e) => {
						setNewTitle(e.target.value)
					}}
				/>
			</div>
			<div>
				<label
					className={`card__input-label ${
						isNewCard ? "opacity-1" : "opacity-0"
					}`} // if already saved once, no need for labels
					htmlFor={`description-${title}`}
				>
					Description
				</label>
				<textarea
					className='card__description'
					value={newDescription}
					id={`description-${title}`}
					name={`description-${title}`}
					placeholder='Idea description here'
					minLength={2}
					maxLength={140}
					rows={4}
					required
					onChange={(e) => {
						setNewDescription(e.target.value)
					}}
				/>

				<CharacterCountdown {...{ newDescription, isEditingDescription }} />
			</div>
			<div className='card__buttons'>
				{(isEditingTitle || isEditingDescription) && (
					<Button variant='primary' onClickAction={handleSaveIdea}>
						Save
					</Button>
				)}
			</div>
			<div className='card__dates'>
				<p className={`${!dateUpdated && "hidden"}`}>
					Updated: {dateUpdated ? `${formatDateAndTime(dateUpdated)}` : "-"}
				</p>
				<p className={`${!dateCreated && "hidden"}`}>
					Created: {dateCreated ? `${formatDateAndTime(dateCreated)}` : "-"}
				</p>
			</div>{" "}
			{showToast && <Toast {...{ setShowToast }} />}
		</div>
	)
}
