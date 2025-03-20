import { IdeaCardType } from "../types"

const ensureTwoDigits = (value: number) => value.toString().padStart(2, "0") // Adds '0' to start if a number has only one digit

const formatDateAndTime = () => {
	const dateCreated = new Date()
	const year = dateCreated.getFullYear()
	const month = ensureTwoDigits(dateCreated.getMonth() + 1)
	const date = ensureTwoDigits(dateCreated.getDate())
	const time = `${ensureTwoDigits(dateCreated.getHours())}:${ensureTwoDigits(
		dateCreated.getMinutes()
	)}`

	return `${date}/${month}/${year} at ${time}`
}

const saveToLocalStorage = (ideaCardCollection: IdeaCardType[]) => {
	const finalData = JSON.stringify(ideaCardCollection)

	localStorage.setItem("ideaCardCollection", finalData)
}

export { formatDateAndTime, saveToLocalStorage }

// const formattedDate = dateCreated.toLocaleString("en-GB", {
// 	day: "2-digit",
// 	month: "2-digit",
// 	year: "numeric",
// 	hour: "2-digit",
// 	minute: "2-digit",
// 	hour12: false, // Use 24-hour format
// }).replace(",", " at"); // Replace comma with "at"

// console.log(formattedDate); // Example: "14/03/2025 at 14:02"
