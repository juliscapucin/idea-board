type IdeaCardType = {
	title: string
	description: string
	[key: string]: string | undefined | number
	dateCreatedRaw?: number
	dateCreated?: string
	dateEdited?: string
}

export type { IdeaCardType }
