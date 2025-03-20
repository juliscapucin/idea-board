import { useEffect, useRef, useState } from "react"

import gsap from "gsap"
import Flip from "gsap/Flip"

import { Button } from "./Buttons"

import { useCloseOnClickOutside, usePopupAnimate } from "../hooks"
import { saveToLocalStorage } from "../lib/utils"

import { IdeaCardType } from "../types"

type DropDownMenuProps = {
	container: HTMLElement | null
	ideaCardCollection: IdeaCardType[]
	setIdeaCardCollection: (arg: IdeaCardType[]) => void
}

export default function DropDownMenu({
	container,
	ideaCardCollection,
	setIdeaCardCollection,
}: DropDownMenuProps) {
	const [showMenu, setShowMenu] = useState(false)
	const [sortChoice, setSortChoice] = useState("")
	const [flipState, setFlipState] = useState<ReturnType<
		typeof Flip.getState
	> | null>(null)

	const dropDownContainerRef = useRef<HTMLDivElement | null>(null)
	const dropDownRef = useRef<HTMLDivElement | null>(null)

	const sort = (option: string) => {
		if (!container) return

		gsap.registerPlugin(Flip)

		setFlipState(Flip.getState(container.children))

		const sortedCollection = [...ideaCardCollection].sort((a, b) => {
			if (option === "dateCreatedRaw" && a.dateCreatedRaw && b.dateCreatedRaw) {
				return a.dateCreatedRaw - b.dateCreatedRaw
			} else if (option === "title" && a.title && b.title) {
				if (a.title < b.title) {
					return -1
				} else if (a.title > b.title) {
					return 1
				} else {
					return 0
				}
			}
			return 0
		})
		setIdeaCardCollection(sortedCollection)
		saveToLocalStorage(sortedCollection)
	}

	// FLIP ANIMATION
	useEffect(() => {
		if (!flipState) return

		Flip.from(flipState, {
			duration: 0.5,
			ease: "power2.out",
		})
	}, [flipState])

	const handleClick = () => {
		setShowMenu(!showMenu)
	}

	// CLOSE ON CLICK OUTSIDE FUNCTIONALITY
	useCloseOnClickOutside(dropDownContainerRef.current, showMenu, setShowMenu)

	// ANIMATE DROPDOWN
	usePopupAnimate(showMenu, dropDownRef.current)

	return (
		<div ref={dropDownContainerRef} className='dropdown'>
			<Button
				classes='dropdown__trigger button-main'
				onClickAction={handleClick}
				variant='faded'
			>
				Sort by: {sortChoice && ` ${sortChoice}`}
			</Button>

			<div
				ref={dropDownRef}
				className={`dropdown__list ${
					!showMenu && "hidden pointer-events-none"
				}`}
			>
				<button
					className='dropdown__list-item'
					onClick={() => {
						sort("title")
						setSortChoice("Title")
						handleClick()
					}}
				>
					Title
				</button>
				<button
					className='dropdown__list-item'
					onClick={() => {
						sort("dateCreatedRaw")
						setSortChoice("Date Created")
						handleClick()
					}}
				>
					Date Created
				</button>
			</div>
		</div>
	)
}
