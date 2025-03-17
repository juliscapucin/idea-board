import { useEffect, useRef, useState } from "react"

type DropDownMenuProps = {
	sort: (arg: string) => void
}

export default function DropDownMenu({ sort }: DropDownMenuProps) {
	const [showMenu, setShowMenu] = useState(false)
	const [sortChoice, setSortChoice] = useState("")

	const dropDownRef = useRef<HTMLDivElement | null>(null)

	const handleOpenMenu = () => {
		setShowMenu(!showMenu)
	}

	function handleClickOutside(e: MouseEvent) {
		if (!dropDownRef.current) return
		if (!dropDownRef.current.contains(e.target as Node)) setShowMenu(false)
	}

	useEffect(() => {
		document.addEventListener("click", (e) => handleClickOutside(e))

		return () =>
			document.removeEventListener("click", (e) => handleClickOutside(e))
	}, [])

	return (
		<div className='dropdown-menu' ref={dropDownRef}>
			<button
				className='dropdown-menu__trigger button-main'
				onClick={handleOpenMenu}
			>
				Sort {sortChoice && `: ${sortChoice}`}
			</button>
			{showMenu && (
				<div className='dropdown-menu__list'>
					<button
						className='button-main'
						onClick={() => {
							sort("title")
							setSortChoice("title")
							handleOpenMenu()
						}}
					>
						Sort by title
					</button>
					<button
						className='button-main'
						onClick={() => {
							sort("dateCreatedRaw")
							setSortChoice("Date Created")
							handleOpenMenu()
						}}
					>
						Sort by date
					</button>
				</div>
			)}
		</div>
	)
}
