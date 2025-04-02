export function IconClose({ iconColor }: { iconColor: string }) {
    const backgroundColor = `bg-${iconColor}`;
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
    );
}

export function IconChevron({
    iconColor,
    classes,
}: {
    iconColor: string;
    classes: string;
}) {
    const colorClass = `text-${iconColor}`;
    return (
        <div className={`icon-chevron__container ${colorClass} ${classes}`}>
            <svg
                width='17'
                height='9'
                viewBox='0 0 17 9'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
            >
                <path d='M1 1L8.5 8L16 1' stroke='currentColor' />
            </svg>
        </div>
    );
}

export function IconHelp() {
    return (
        <div className='icon-help__container'>
            <span className='icon-help__icon'>?</span>
        </div>
    );
}

export function IconPlus() {
    return (
        <div className='icon-plus__container'>
            <span className='icon-plus__line'></span>
            <span className='icon-plus__line'></span>
        </div>
    );
}
