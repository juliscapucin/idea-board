import { useEffect } from "react"

export default function useCloseOnClickOutside(
	container: HTMLElement | null,
	state: boolean,
	setState: (arg: boolean) => void
) {
	useEffect(() => {
		if (!container) return

		function handleClickOutside(e: MouseEvent) {
			if (!container!.contains(e.target as Node)) setState(false)
		}

		if (state) {
			document.addEventListener("click", handleClickOutside)
		} else {
			document.removeEventListener("click", handleClickOutside)
		}

		return () => {
			document.removeEventListener("click", handleClickOutside)
		}
	}, [state])
}
