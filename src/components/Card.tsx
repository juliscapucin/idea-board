import { useEffect, useRef, useState } from "react"

import gsap from "gsap"
import Flip from "gsap/Flip"

gsap.registerPlugin(Flip)

import { IdeaCard } from "../types"

import {
	emptyDescriptionMessage,
	emptyTitleMessage,
} from "../lib/alert-messages"

import { formatDateAndTime, saveToLocalStorage } from "../lib/utils"
import { Alert, CharacterCountdown, Toast } from "../components"
import { Button, ButtonClose } from "./Buttons"
import { useSortMenuContext } from "../context"

type IdeaCardProps = {
	ideaCard: IdeaCard
	ideaCardCollection: IdeaCard[]
	setIdeaCardCollection: (newCollection: IdeaCard[]) => void
	cardIndex: number
}

// SAVE IDEA
const saveIdea = (
	ideaCardCollection: IdeaCard[],
	setIdeaCardCollection: (arg: IdeaCard[]) => void,
	setSortChoice: (arg: string) => void,
	id: string,
	newTitle: string,
	setNewTitle: (arg: string) => void,
	newDescription: string,
	setNewDescription: (arg: string) => void,
	title: string,
	description: string,
	dateCreated: number | null,
	setAlertMessage: (arg: string) => void
) => {
	// RESET SORT MENU
	setSortChoice("")

	const cardToEdit = ideaCardCollection.find((card) => card.id === id)

	if (!cardToEdit) return

	const cardToEditIndex = ideaCardCollection.indexOf(cardToEdit)

	let updatedCard: IdeaCard

	updatedCard = {
		id,
		title: newTitle,
		description: newDescription,
		dateCreated: dateCreated ? dateCreated : Date.now(), // If it hasn't been saved yet, set Created Date
		dateUpdated: dateCreated ? null : Date.now(), // If already been saved, set Updated Date
	}

	// CHECK FOR EMPTY TITLE
	if (
		title !== newTitle && // if Title has been updated
		updatedCard
	) {
		if (newTitle.length < 2) {
			setAlertMessage(emptyTitleMessage)
			setNewTitle(title) // revert to original title
			return
		}
	}

	if (
		// CHECK FOR EMTPY DESCRIPTION
		description !== newDescription && // if Description has been updated
		updatedCard
	) {
		// Empty description
		if (newDescription.length < 2) {
			setAlertMessage(emptyDescriptionMessage)
			setNewDescription(description) // revert to original description
			return
		}
	}

	if (
		// SAVE
		(title !== newTitle || description !== newDescription) &&
		updatedCard
	) {
		// Create a new array with updated data
		const updatedCollection = [...ideaCardCollection]
		updatedCollection[cardToEditIndex] = updatedCard

		setIdeaCardCollection(updatedCollection)
	}
}

export default function Card({
	ideaCard,
	ideaCardCollection,
	setIdeaCardCollection,
	cardIndex,
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

	const deleteIdea = (title: string) => {
		if (!ideaCardRef.current || !ideaCardRef.current.parentElement) return
		const state = Flip.getState(ideaCardRef.current.parentElement.children)

		const updatedCollection = ideaCardCollection.filter((card) => {
			if (card.title !== title) return card
		})

		saveToLocalStorage(updatedCollection)
		setIdeaCardCollection(updatedCollection)

		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				Flip.from(state, {
					duration: 0.5,
					ease: "power2.out",
				})
			})
		})
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
					htmlFor={`title-${cardIndex}`}
				>
					Idea title
				</label>
				<input
					className='card__title'
					ref={titleRef}
					value={newTitle}
					id={`title-${cardIndex}`}
					name={`title-${cardIndex}`}
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
					htmlFor={`description-${cardIndex}`}
				>
					Description
				</label>
				<textarea
					className='card__description'
					value={newDescription}
					id={`description-${cardIndex}`}
					name={`description-${cardIndex}`}
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
					<Button
						variant='primary'
						onClickAction={() =>
							saveIdea(
								ideaCardCollection,
								setIdeaCardCollection,
								setSortChoice,
								id,
								newTitle,
								setNewTitle,
								newDescription,
								setNewDescription,
								title,
								description,
								dateCreated,
								setAlertMessage
							)
						}
					>
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
			</div>
			{showToast && <Toast {...{ setShowToast }} />}
		</div>
	)
}
