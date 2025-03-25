type IdeaCard = {
	id: string
	title: string
	description: string
	// [key: string]: string | null | number
	dateCreated: number | null
	dateUpdated: number | null
}

export type { IdeaCard }
