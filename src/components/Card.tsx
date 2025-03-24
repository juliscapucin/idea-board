import { useEffect, useRef, useState } from "react"

import gsap from "gsap"
import Flip from "gsap/Flip"

gsap.registerPlugin(Flip)

import { IdeaCardType } from "../types"

import {
	duplicatedDescriptionMessage,
	duplicatedTitleMessage,
	emptyDescriptionMessage,
	emptyTitleMessage,
} from "../lib/alert-messages"

import { formatDateAndTime, saveToLocalStorage } from "../lib/utils"
import { useCardDrag } from "../hooks"
import { Alert, CharacterCountdown, ToastPopup } from "../components"
import { Button, ButtonClose } from "./Buttons"
import { useSortMenuContext } from "../context"

type IdeaCardProps = {
	ideaCard: IdeaCardType
	ideaCardCollection: IdeaCardType[]
	setIdeaCardCollection: (newCollection: IdeaCardType[]) => void
	cardIndex: number
}

export default function Card({
	ideaCard,
	ideaCardCollection,
	setIdeaCardCollection,
	cardIndex,
}: IdeaCardProps) {
	const { id, title, description, dateCreated, dateCreatedRaw, dateUpdated } =
		ideaCard

	const [newTitle, setNewTitle] = useState(title)
	const [newDescription, setNewDescription] = useState(description)
	const [isEditingTitle, setIsEditingTitle] = useState(false)
	const [isEditingDescription, setIsEditingDescription] = useState(false)
	const [showToast, setShowToast] = useState(false)
	const [showAlert, setShowAlert] = useState(false)
	const [alertMessage, setAlertMessage] = useState("")

	const ideaCardRef = useRef<HTMLDivElement | null>(null)
	const titleRef = useRef<HTMLInputElement>(null)

	const isNewCard = !dateCreated ? true : false // If dateCreated is null, it's a new card

	const { setSortChoice } = useSortMenuContext()

	const saveIdea = () => {
		// RESET SORT MENU
		setSortChoice("")

		const cardToEdit = ideaCardCollection.find(
			(card) => card.title === title || card.description === description
		)

		if (!cardToEdit) return

		const cardToEditIndex = ideaCardCollection.indexOf(cardToEdit)

		let editedCard: IdeaCardType

		// If new card, set Created Date
		if (isNewCard) {
			editedCard = {
				id,
				title: newTitle,
				description: newDescription,
				dateCreated: formatDateAndTime(),
				dateCreatedRaw: Date.now(),
				dateUpdated: null,
			}
		} else {
			// If saved previously, set Edited Date
			editedCard = {
				id,
				title: newTitle,
				description: newDescription,
				dateCreated,
				dateCreatedRaw,
				dateUpdated: formatDateAndTime(),
			}
		}

		// CHECK FOR EMPTY / DUPLICATED TITLE
		if (
			title !== newTitle && // if Title has been edited
			editedCard
		) {
			// Duplicated title
			if (
				ideaCardCollection.find(
					(card) => card.title.toLowerCase() === editedCard.title.toLowerCase()
				)
			) {
				setAlertMessage(duplicatedTitleMessage)
				setShowAlert(true)
				setNewTitle(title) // revert to original title
				setIsEditingTitle(false)
				return
			}

			// Empty title
			if (newTitle.length < 2) {
				setAlertMessage(emptyTitleMessage)
				setShowAlert(true)
				setNewTitle(title) // revert to original title
				setIsEditingTitle(false)
				return
			}
		} else if (
			// CHECK FOR EMTPY / DUPLICATED DESCRIPTION
			description !== newDescription && // if Description has been edited
			editedCard
		) {
			// Empty description
			if (newDescription.length < 2) {
				setAlertMessage(emptyDescriptionMessage)
				setShowAlert(true)
				setNewDescription(description) // revert to original description
				setIsEditingDescription(false)
				return
			}

			// Duplicated description
			if (
				ideaCardCollection.find(
					(card) =>
						card.description.toLowerCase() ===
						editedCard.description.toLowerCase()
				)
			) {
				setAlertMessage(duplicatedDescriptionMessage)
				setShowAlert(true)
				setNewDescription(description) // revert to original description
				setIsEditingDescription(false)
				return
			}
		}

		if (
			// SAVE AND SHOW TOAST
			(title !== newTitle || description !== newDescription) &&
			editedCard
		) {
			// Create a new array with updated data
			const updatedCollection = [...ideaCardCollection]
			updatedCollection[cardToEditIndex] = editedCard

			console.log(cardToEditIndex)

			setIdeaCardCollection(updatedCollection)

			// Store updated data on local storage
			const finalData = JSON.stringify(updatedCollection)
			localStorage.setItem("ideaCardCollection", finalData)

			// Check if data was saved + show toast
			const storedData = localStorage.getItem("ideaCardCollection")
			if (storedData === finalData) {
				setIsEditingTitle(false)
				setIsEditingDescription(false)

				setShowToast(true)
			}
		}
	}

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
	}, [isNewCard])

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

	// DRAGGABLE FUNCTIONALITY
	useCardDrag(ideaCardRef, ideaCardCollection, setIdeaCardCollection, isNewCard)

	return (
		<div ref={ideaCardRef} className='card'>
			<Alert
				{...{
					showAlert,
					setShowAlert,
					alertMessage,
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
						setIsEditingTitle(true)
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
						setIsEditingDescription(true)
					}}
				/>

				<CharacterCountdown {...{ newDescription, isEditingDescription }} />
			</div>

			<div className='card__buttons'>
				{(isEditingTitle || isEditingDescription) && (
					<Button variant='primary' onClickAction={saveIdea}>
						Save
					</Button>
				)}
			</div>
			<div className='card__dates'>
				<p className={`${!dateUpdated && "hidden"}`}>Updated: {dateUpdated}</p>
				<p className={`${!dateCreated && "hidden"}`}>Created: {dateCreated}</p>
			</div>
			{showToast && <ToastPopup {...{ setShowToast }} />}
		</div>
	)
}
