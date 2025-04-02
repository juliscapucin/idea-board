const ensureTwoDigits = (value: number) => value.toString().padStart(2, "0"); // Adds '0' to start if a number has only one digit

const formatDateAndTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = ensureTwoDigits(date.getMonth() + 1);
    const dayOfMonth = ensureTwoDigits(date.getDate());
    const time = `${ensureTwoDigits(date.getHours())}:${ensureTwoDigits(
        date.getMinutes()
    )}`;

    return `${dayOfMonth}/${month}/${year} at ${time}`;
};

export { formatDateAndTime };

// const formattedDate = date.toLocaleString("en-GB", {
// 	day: "2-digit",
// 	month: "2-digit",
// 	year: "numeric",
// 	hour: "2-digit",
// 	minute: "2-digit",
// 	hour12: false, // Use 24-hour format
// }).replace(",", " at"); // Replace comma with "at"

// console.log(formattedDate); // Example: "14/03/2025 at 14:02"
