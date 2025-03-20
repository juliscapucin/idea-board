import { useRef, useState } from "react"

import { Button, ButtonClose } from "./Buttons"
import usePopupAnimate from "../hooks/usePopupAnimate"

export default function InstructionsPopup() {
	const [showInstructions, setShowInstructions] = useState(false)

	const popupRef = useRef(null)

	const handleClick = () => {
		setShowInstructions(showInstructions ? false : true)
	}

	usePopupAnimate(showInstructions, popupRef.current)

	return (
		<div className='instructions'>
			<Button onClickAction={handleClick}>Instructions</Button>
			<div
				ref={popupRef}
				className={`instructions__popup ${
					!showInstructions && "hidden pointer-events-none"
				}`}
			>
				<ButtonClose
					classes={"instructions__button-close"}
					onClickAction={handleClick}
					iconColor='secondary'
				/>

				<div className='instructions__content'>
					<h2 className='instructions__title'>Task</h2>
					<p>
						Build an idea board that allows a user to create new ideas, edit
						existing ideas or delete them. Each idea should be represented as a
						tile on the board that displays a title, description and
						created/updated time. The title and description should be editable
						inline. The description text should have a max length of 140
						characters. There should also be a button on the tile that allows
						for it to be deleted.
					</p>
					<p>
						When working through the task you should treat it as if you're
						writing real world production code. We're looking to see a test
						suite, comments where required and an attention to detail. In
						addition to this you may use whatever libraries or packages you
						wish. This should take you around two or three hours to complete
						fully but feel free to spend as much or as little time on the
						exercise as you like. Detail anything you didn't get around to
						completing in the COMMENTS.md file along with any other additonal
						information we should be aware of when reviewing the code.
					</p>
					<h3 className='instructions__subtitle'>Required</h3>
					<ul>
						<li>Page should be fully responsive.</li>
						<li>
							Each idea tile should contain a title and description, which is
							editable, as well as created/updated time.
						</li>
						<li>
							New ideas should have the title field focused to prompt user to
							begin typing.
						</li>
						<li>
							Add the ability to sort ideas by creation date or alphabetically.
						</li>
					</ul>
					<h3 className='instructions__subtitle'>Stretch</h3>
					<ul>
						<li>
							Utilise the localStorage API to persist current state when the
							page is refreshed.
						</li>
						<li>
							Add a character countdown as the user is approaching the limit of
							their description text.
						</li>
						<li>
							Add an unobtrusive notification when an update is made to a tile.
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}
