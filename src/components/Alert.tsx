import { useEffect, useRef } from "react"
import { Button } from "./Buttons"

type AlertProps = {
	alertMessage: string | null
	setAlertMessage: (arg: string | null) => void
	titleRef: HTMLInputElement | null
}

export default function Alert({
	alertMessage,
	setAlertMessage,
	titleRef,
}: AlertProps) {
	const alertRef = useRef(null)

	const handleClick = () => {
		setAlertMessage(null)
		titleRef?.focus()
	}

	useEffect(() => {
		if (!alertMessage || alertRef.current) return

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
	}, [alertMessage])

	return (
		<div ref={alertRef} className={`alert ${!alertMessage && "hidden"}`}>
			<div className='alert__overlay'>
				<div className='alert__popup'>
					<div className='alert__content'>
						<h2>Oops!</h2>
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
