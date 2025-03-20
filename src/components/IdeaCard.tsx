import { useEffect, useRef, useState } from "react"

import gsap from "gsap"
import Flip from "gsap/Flip"

gsap.registerPlugin(Flip)

import { IdeaCardType } from "../types"

import { duplicatedTitleMessage } from "../lib/feedback-messages"
import { formatDateAndTime, saveToLocalStorage } from "../lib/utils"
import { useCardDrag } from "../hooks"
import { Button, ButtonClose } from "./Buttons"

type IdeaCardProps = {
	ideaCard: IdeaCardType
	ideaCardCollection: IdeaCardType[]
	setIdeaCardCollection: (newCollection: IdeaCardType[]) => void
}

export default function IdeaCard({
	ideaCard,
	ideaCardCollection,
	setIdeaCardCollection,
}: IdeaCardProps) {
	const { title, description, dateCreated, dateCreatedRaw, dateEdited } =
		ideaCard

	const isSaved = dateCreated ? true : false

	const [newTitle, setNewTitle] = useState(title)
	const [newDescription, setNewDescription] = useState(description)
	const [characterCount, setCharacterCount] = useState(0)
	const [isEditingTitle, setIsEditingTitle] = useState(false)
	const [isEditingDescription, setIsEditingDescription] = useState(false)
	const [flipState, setFlipState] = useState<ReturnType<
		typeof Flip.getState
	> | null>(null)

	const ideaCardRef = useRef<HTMLDivElement>(null)
	const titleRef = useRef<HTMLInputElement>(null)

	const saveIdea = () => {
		const cardToEdit = ideaCardCollection.find(
			(card) => card.title === title || card.description === description
		)

		if (!cardToEdit) return

		const cardToEditIndex = ideaCardCollection.indexOf(cardToEdit)

		let editedCard: IdeaCardType

		// If saved previously, set Edited Date
		if (isSaved) {
			editedCard = {
				title: newTitle,
				description: newDescription,
				dateCreated,
				dateCreatedRaw,
				dateEdited: formatDateAndTime(),
			}
		} else {
			// If not saved previously, set Created Date
			editedCard = {
				title: newTitle,
				description: newDescription,
				dateCreated: formatDateAndTime(),
				dateCreatedRaw: Date.now(),
				dateEdited: undefined,
			}
		}

		// CHECK FOR DUPLICATED TITLE
		if (
			title !== newTitle && // if Title has been edited
			editedCard &&
			ideaCardCollection.find(
				(card) => card.title.toLowerCase() === editedCard.title.toLowerCase()
			)
		) {
			alert(duplicatedTitleMessage)
			setNewTitle(title) // if new title exists, revert to original title
			titleRef.current && titleRef.current.focus()
		} else if (editedCard) {
			// CREATE A NEW ARRAY WITH UPDATED DATA
			const updatedCollection = [...ideaCardCollection]
			updatedCollection[cardToEditIndex] = editedCard

			setIdeaCardCollection(updatedCollection)
			saveToLocalStorage(updatedCollection)

			setIsEditingTitle(false)
			setIsEditingDescription(false)
		}
	}

	const deleteIdea = (title: string) => {
		if (ideaCardRef.current && ideaCardRef.current.parentElement) {
			setFlipState(Flip.getState(ideaCardRef.current.parentElement.children))
		}

		const updatedCollection = ideaCardCollection.filter((card) => {
			if (card.title !== title) return card
		})

		setIdeaCardCollection(updatedCollection)
		saveToLocalStorage(updatedCollection)
	}

	// FLIP ANIMATION
	useEffect(() => {
		if (!flipState) return

		Flip.from(flipState, {
			duration: 0.5,
			ease: "power2.out",
		})
	}, [flipState])

	// FOCUS ON TITLE (NEW CARD)
	useEffect(() => {
		if (!isSaved && titleRef.current) titleRef.current.focus()
	}, [])

	// SAVE ON CLICK OUTSIDE
	// useEffect(() => {
	// 	if (!ideaCardRef.current || (!isEditingTitle && !isEditingDescription))
	// 		return

	// 	const saveOnClickOutside = (e: Event) => {
	// 		if (!ideaCardRef.current!.contains(e.target)) {
	// 			saveIdea()
	// 		}
	// 	}

	// 	document.addEventListener("click", saveOnClickOutside)

	// 	return () => document.removeEventListener("click", saveOnClickOutside)
	// }, [ideaCardRef, isEditingDescription, isEditingTitle])

	// CHARACTER COUNT
	useEffect(() => {
		setCharacterCount(newDescription.length)
	}, [newDescription])

	// DRAGGABLE
	useCardDrag(ideaCardRef.current, ideaCardCollection, setIdeaCardCollection)

	return (
		<div ref={ideaCardRef} className='idea-card'>
			<ButtonClose
				classes={"idea-card__close-button"}
				onClickAction={() => deleteIdea(title)}
				iconColor='faded-light'
			/>

			<div className='idea-card__fields'>
				<label
					className={`${isSaved ? "opacity-0" : "opacity-1"}`}
					htmlFor='title'
				>
					Idea title
				</label>
				<input
					className='idea-card__title'
					ref={titleRef}
					value={newTitle}
					type='text'
					id='title'
					name='title'
					minLength={2}
					maxLength={50}
					placeholder='My Best Idea'
					required
					onFocus={() => console.log("focus")}
					onChange={(e) => {
						setNewTitle(e.target.value)
						setIsEditingTitle(true)
					}}
				/>
			</div>

			<div>
				<label
					className={`${isSaved ? "opacity-0" : "opacity-1"}`} // if already saved once, no need for labels
					htmlFor='description'
				>
					Description
				</label>
				<textarea
					className='idea-card__description'
					value={newDescription}
					id='description'
					name='description'
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

				<p
					className={`idea-card__countdown ${
						// Show character count if user is editing description
						isEditingDescription ? "opacity-1" : "opacity-0"
					}`}
				>
					{characterCount} of 140 characters
				</p>
			</div>

			<div className='idea-card__buttons'>
				{(isEditingTitle || isEditingDescription) && (
					<Button variant='primary' onClickAction={saveIdea}>
						Save
					</Button>
				)}
			</div>
			<div className='idea-card__dates'>
				<p className={`${!dateCreated && "hidden"}`}>
					Created on: {dateCreated}
				</p>
				<p className={`${!dateEdited && "hidden"}`}>
					Last edited on: {dateEdited}
				</p>
			</div>
		</div>
	)
}
