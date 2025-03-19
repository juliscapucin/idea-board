import { IconClose } from "./Icons"

type ButtonProps = {
	onClickAction: (arg: boolean) => void
	classes?: string
	children?: React.ReactNode
}

export function ButtonClose({ onClickAction, classes }: ButtonProps) {
	return (
		<button
			className={`button-close ${classes}`}
			onClick={() => onClickAction(false)}
		>
			<IconClose />
		</button>
	)
}

export function ButtonPrimary({
	onClickAction,
	classes,
	children,
}: ButtonProps) {
	return (
		<button
			className={`button-main ${classes}`}
			onClick={() => onClickAction(false)}
		>
			{children}
		</button>
	)
}

export function ButtonFaded({ onClickAction, classes, children }: ButtonProps) {
	return (
		<button
			className={`button-faded ${classes}`}
			onClick={() => onClickAction(false)}
		>
			{children}
		</button>
	)
}
