import { IconClose } from "./Icons"

type ButtonProps = {
	onClickAction: (arg: boolean) => void
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
		<button
			className={`button-close ${classes}`}
			onClick={() => onClickAction(false)}
		>
			<IconClose {...{ iconColor }} />
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
	}

	return (
		<button
			className={`${variant && variantClasses[variant]} ${classes}`}
			onClick={() => onClickAction(false)}
		>
			{children}
		</button>
	)
}
