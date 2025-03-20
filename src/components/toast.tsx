import { useEffect, useRef } from "react"

import gsap from "gsap"

type ToastProps = {
	showToast: boolean
	setShowToast: (arg: boolean) => void
}

export default function Toast({ showToast, setShowToast }: ToastProps) {
	const toastRef = useRef(null)

	useEffect(() => {
		console.log(showToast)
		if (!showToast) return

		const ctx = gsap.context(() => {
			const tl = gsap.timeline()
			tl.to(toastRef.current, {
				yPercent: -150,
				ease: "power3.out",
				duration: 0.3,
			}).to(toastRef.current, {
				xPercent: 200,
				duration: 0.1,
				ease: "power4.in",
				delay: 1,
				onComplete: () => setShowToast(false),
			})
		})

		return () => ctx.revert()
	}, [showToast])

	return (
		<div ref={toastRef} className='toast'>
			<p className='toast__text'>SAVED!</p>
		</div>
	)
}
