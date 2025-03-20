import { useEffect, useRef, useState } from "react"

import gsap from "gsap"
import Flip from "gsap/Flip"

import usePopupAnimate from "../hooks/usePopupAnimate"
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

	const dropDownRef = useRef<HTMLDivElement | null>(null)

	const sort = (option: string) => {
		if (!container) return

		gsap.registerPlugin(Flip)

		const state = Flip.getState(container.children)
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
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				Flip.from(state, { duration: 0.5, ease: "power2.out" })
			})
		})
	}

	const handleClick = () => {
		setShowMenu(!showMenu)
	}

	// CLICK OUTSIDE FUNCTIONALITY
	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (!dropDownRef.current || !showMenu) return
			if (!dropDownRef.current.contains(e.target as Node)) setShowMenu(false)
		}

		document.addEventListener("click", (e) => handleClickOutside(e))

		return () =>
			document.removeEventListener("click", (e) => handleClickOutside(e))
	}, [])

	usePopupAnimate(showMenu, dropDownRef.current)

	return (
		<div className='dropdown'>
			<button className='dropdown__trigger button-main' onClick={handleClick}>
				Sort by: {sortChoice && ` ${sortChoice}`}
			</button>

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
