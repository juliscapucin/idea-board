import { IconClose } from "../Icons";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    classes?: string;
    iconColor?: string;
    variant?: string;
}

export function ButtonClose({ classes, iconColor, ...props }: ButtonProps) {
    return (
        <button className={`button-close ${classes}`} {...props}>
            <IconClose iconColor={iconColor || "secondary"} />
        </button>
    );
}

export function Button({ classes, variant, ...props }: ButtonProps) {
    const variantClasses: Record<string, string> = {
        primary: "button-main",
        faded: "button-faded",
        ghost: "button-ghost",
    };

    return (
        <button
            className={`button ${variant && variantClasses[variant]} ${classes}`}
            {...props}
        >
            {props.children}
        </button>
    );
}
