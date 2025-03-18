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
		<div className='dropdown' ref={dropDownRef}>
			<button
				className='dropdown__trigger button-main'
				onClick={handleOpenMenu}
			>
				Sort by: {sortChoice && ` ${sortChoice}`}
			</button>
			{showMenu && (
				<div className='dropdown__list'>
					<button
						className='dropdown__list-item'
						onClick={() => {
							sort("title")
							setSortChoice("Title")
							handleOpenMenu()
						}}
					>
						Title
					</button>
					<button
						className='dropdown__list-item'
						onClick={() => {
							sort("dateCreatedRaw")
							setSortChoice("Date Created")
							handleOpenMenu()
						}}
					>
						Date Created
					</button>
				</div>
			)}
		</div>
	)
}
