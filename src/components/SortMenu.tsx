import { useRef, useState } from "react"

import { Button } from "./Buttons"

import { useCloseOnClickOutside, usePopupAnimate } from "../hooks"

import { useSortMenuContext } from "../context"

import { IdeaCard } from "../types"
import { IconChevron } from "./Icons"

type SortMenuProps = {
	ideaCardCollection: IdeaCard[]
	setIdeaCardCollection: (arg: IdeaCard[]) => void
}

export default function SortMenu({
	ideaCardCollection,
	setIdeaCardCollection,
}: SortMenuProps) {
	const [showMenu, setShowMenu] = useState(false)

	const sortMenuContainerRef = useRef<HTMLDivElement | null>(null)
	const sortMenuRef = useRef<HTMLDivElement | null>(null)

	const { sortChoice, setSortChoice } = useSortMenuContext()

	const sort = (option: string) => {
		const sortedCollection = [...ideaCardCollection].sort((a, b) => {
			if (option === "dateCreated" && a.dateCreated && b.dateCreated) {
				return a.dateCreated - b.dateCreated
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
	}

	const handleClick = () => {
		setShowMenu(!showMenu)
	}

	// CLOSE ON CLICK OUTSIDE FUNCTIONALITY
	useCloseOnClickOutside(sortMenuContainerRef.current, showMenu, setShowMenu)

	// ANIMATE SORTMENU
	usePopupAnimate(showMenu, sortMenuRef.current)

	return (
		<div ref={sortMenuContainerRef} className='sort-menu'>
			<Button
				classes='sort-menu__trigger'
				onClickAction={handleClick}
				variant='ghost'
			>
				<div className='sort-menu__trigger-content'>
					<span>Sort {sortChoice && `by: ${sortChoice}`}</span>
					<IconChevron
						iconColor='secondary'
						classes={`transform-200 ${showMenu && "rotate-180"}`}
					/>
				</div>
			</Button>

			<div
				ref={sortMenuRef}
				className={`sort-menu__list ${
					!showMenu && "hidden pointer-events-none"
				}`}
			>
				<button
					className='sort-menu__list-item'
					onClick={() => {
						sort("title")
						setSortChoice("Title")
						handleClick()
					}}
				>
					Title
				</button>
				<button
					className='sort-menu__list-item'
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
