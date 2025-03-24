import { useEffect, useRef } from "react"
import { Button } from "./Buttons"

type AlertProps = {
	showAlert: boolean
	setShowAlert: (arg: boolean) => void
	alertMessage: string
}

export default function Alert({
	showAlert,
	setShowAlert,
	alertMessage,
}: AlertProps) {
	const alertRef = useRef(null)

	const handleClick = () => {
		setShowAlert(false)
	}

	useEffect(() => {
		if (!showAlert || alertRef.current) return

		const ctx = gsap.context(() => {
			gsap.to(alertRef.current, {
				opacity: 1,
				duration: 0.5,
			})
		})

		return () => ctx.revert()
	}, [showAlert])

	return (
		<div ref={alertRef} className={`alert ${!showAlert && "hidden"}`}>
			<div className='alert__overlay'>
				<div className='alert__popup'>
					<div>
						<h1>Alert</h1>
						<p>{alertMessage}</p>
						<Button onClickAction={handleClick} variant='primary'>
							OK
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
