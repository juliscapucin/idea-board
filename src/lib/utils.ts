const ensureTwoDigits = (value: number) => value.toString().padStart(2, "0") // Adds '0' to start if a number has only one digit

const getDateAndTime = () => {
	const dateCreated = new Date()
	const year = dateCreated.getFullYear()
	const month = ensureTwoDigits(dateCreated.getMonth() + 1)
	const date = ensureTwoDigits(dateCreated.getDate())
	const time = `${ensureTwoDigits(dateCreated.getHours())}:${ensureTwoDigits(
		dateCreated.getMinutes()
	)}`

	return `${date}/${month}/${year} at ${time}`
}

export { getDateAndTime }
