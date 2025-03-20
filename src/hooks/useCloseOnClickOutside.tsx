import { useEffect } from "react"

export default function useCloseOnClickOutside(
	container: HTMLElement | null,
	state: boolean,
	setState: (arg: boolean) => void
) {
	useEffect(() => {
		if (!container) return

		function handleClickOutside(e: MouseEvent) {
			console.log("click outside")
			if (!container!.contains(e.target as Node)) setState(false)
		}

		if (state) {
			console.log("event added")
			document.addEventListener("click", handleClickOutside)
		} else {
			console.log("event removed")
			document.removeEventListener("click", handleClickOutside)
		}

		return () => {
			document.removeEventListener("click", handleClickOutside)
		}
	}, [state])
}
