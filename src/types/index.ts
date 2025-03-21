type IdeaCardType = {
	title: string
	description: string
	[key: string]: string | null | number
	dateCreatedRaw: number | null
	dateCreated: string | null
	dateEdited: string | null
}

export type { IdeaCardType }
