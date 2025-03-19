type IconCloseProps = {
	iconColor?: string
}

export function IconClose({ iconColor }: IconCloseProps) {
	const backgroundColor = `bg-${iconColor}`
	return (
		<div className='icon-close'>
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
