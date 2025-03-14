const ensureTwoDigits = (unit: number) => unit.toString().padStart(2, "0") // Adds '0' to start if a number has only one digit

const getDateAndTime = () => {
	const dateCreated = new Date()
	const year = dateCreated.getFullYear()
	const month = ensureTwoDigits(dateCreated.getMonth() + 1)
	const date = dateCreated.getDate()
	const time = `${ensureTwoDigits(
		dateCreated.getHours()
	)}:${dateCreated.getMinutes()}`

	return `${date}/${month}/${year} at ${time}`
}

export { getDateAndTime }
