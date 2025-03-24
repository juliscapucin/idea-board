import { useEffect, useRef } from "react"
import { Button } from "./Buttons"

type AlertProps = {
	showAlert: boolean
	setShowAlert: (arg: boolean) => void
	alertMessage: string
	titleRef: HTMLInputElement | null
}

export default function Alert({
	showAlert,
	setShowAlert,
	alertMessage,
	titleRef,
}: AlertProps) {
	const alertRef = useRef(null)

	const handleClick = () => {
		setShowAlert(false)
		titleRef?.focus()
	}

	useEffect(() => {
		if (!showAlert || alertRef.current) return

		const ctx = gsap.context(() => {
			gsap.fromTo(
				alertRef.current,
				{ opacity: 0 },
				{
					opacity: 1,
					duration: 0.5,
				}
			)
		})

		return () => ctx.revert()
	}, [showAlert])

	return (
		<div ref={alertRef} className={`alert ${!showAlert && "hidden"}`}>
			<div className='alert__overlay'>
				<div className='alert__popup'>
					<div className='alert__content'>
						<h1>Alert</h1>
						<p className='alert__message'>{alertMessage}</p>
						<Button onClickAction={handleClick} variant='primary'>
							OK
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
