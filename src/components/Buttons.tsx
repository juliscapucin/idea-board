import { IconClose } from "./Icons";

type ButtonProps = {
    onClickAction: () => void;
    classes?: string;
    children?: React.ReactNode;
    iconColor?: string;
    variant?: string;
    testId: string;
};

export function ButtonClose({
    onClickAction,
    classes,
    iconColor,
    testId,
}: ButtonProps) {
    return (
        <button
            className={`button-close ${classes}`}
            onClick={onClickAction}
            data-testid={testId}
        >
            <IconClose
                {...{ iconColor: iconColor ? iconColor : "secondary" }}
            />
        </button>
    );
}

export function Button({
    onClickAction,
    classes,
    children,
    variant,
    testId,
}: ButtonProps) {
    const variantClasses: Record<string, string> = {
        primary: "button-main",
        faded: "button-faded",
        ghost: "button-ghost",
    };

    return (
        <button
            className={`button ${variant && variantClasses[variant]} ${classes}`}
            onClick={onClickAction}
            data-testid={testId}
        >
            {children}
        </button>
    );
}
