export function IconClose({ iconColor }: { iconColor: string }) {
	const backgroundColor = `bg-${iconColor}`
	return (
		<div className='icon-close__container'>
			<div
				className={`icon-close__line rotate-45 ${
					backgroundColor && backgroundColor
				}`}
			></div>
			<div
				className={`icon-close__line -rotate-45 ${
					backgroundColor && backgroundColor
				}`}
			></div>
		</div>
	)
}

export function IconHelp({ iconColor }: { iconColor: string }) {
	const color = `text-${iconColor}`
	return (
		<div className='icon-help__container'>
			<span className={`icon-help__icon ${color}`}>?</span>
		</div>
	)
}
