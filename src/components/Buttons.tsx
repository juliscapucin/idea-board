import { IconClose } from "./Icons"

type ButtonProps = {
	onClickAction: () => void
	classes?: string
	children?: React.ReactNode
	iconColor?: string
	variant?: string
}

export function ButtonClose({
	onClickAction,
	classes,
	iconColor,
}: ButtonProps) {
	return (
		<button className={`button-close ${classes}`} onClick={onClickAction}>
			<IconClose {...{ iconColor: iconColor ? iconColor : "secondary" }} />
		</button>
	)
}

export function Button({
	onClickAction,
	classes,
	children,
	variant,
}: ButtonProps) {
	const variantClasses: Record<string, string> = {
		primary: "button-main",
		faded: "button-faded",
		ghost: "button-ghost",
	}

	return (
		<button
			className={`button ${variant && variantClasses[variant]} ${classes}`}
			onClick={onClickAction}
		>
			{children}
		</button>
	)
}

type ButtonHoverProps = {
	onMouseEnterAction: () => void
	onMouseLeaveAction: () => void
	classes?: string
	children?: React.ReactNode
	iconColor?: string
	variant?: string
}

export function ButtonHover({
	onMouseEnterAction,
	onMouseLeaveAction,
	classes,
	children,
	variant,
}: ButtonHoverProps) {
	const variantClasses: Record<string, string> = {
		primary: "button-main",
		faded: "button-faded",
		ghost: "button-ghost",
	}

	return (
		<button
			className={`button ${variant && variantClasses[variant]} ${classes}`}
			onMouseEnter={onMouseEnterAction}
			onMouseLeave={onMouseLeaveAction}
		>
			{children}
		</button>
	)
}
