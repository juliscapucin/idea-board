import { useEffect, useRef } from "react"

import gsap from "gsap"

type ToastProps = {
	setShowToast: (arg: boolean) => void
}

export default function Toast({ setShowToast }: ToastProps) {
	const toastRef = useRef(null)

	useEffect(() => {
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
	}, [])

	return (
		<div ref={toastRef} className='toast'>
			<p className='toast__text'>SAVED!</p>
		</div>
	)
}
