"use client"

import { createContext, useContext, useState } from "react"

// TYPE
interface ContextProps {
	sortChoice: string | null
	// setSortChoice: (arg: string) => void
	setSortChoice: React.Dispatch<React.SetStateAction<string>>
}

// CREATE CONTEXT
const SortContext = createContext<ContextProps | null>(null)

// CONTEXT PROVIDER
export const SortContextProvider = ({
	children,
}: {
	children: React.ReactNode
}) => {
	const [sortChoice, setSortChoice] = useState("")

	return (
		<SortContext.Provider
			value={{
				sortChoice,
				setSortChoice,
			}}
		>
			{children}
		</SortContext.Provider>
	)
}

// CONTEXT CUSTOM HOOK
export const useSortMenuContext = () => {
	const context = useContext(SortContext)
	if (!context)
		throw new Error("useSortContext must be used within SortContextProvider")
	return context
}
