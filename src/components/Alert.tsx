import { AnimatePresence, motion } from "framer-motion";

import { Button } from "./Buttons";

type AlertProps = {
    alertMessage: string | null;
    setAlertMessage: (arg: string | null) => void;
    titleRef: HTMLInputElement | null;
};

import { popupAnimation } from "../lib/animations";

export default function Alert({
    alertMessage,
    setAlertMessage,
    titleRef,
}: AlertProps) {
    const handleClick = () => {
        setAlertMessage(null);
        titleRef?.focus();
    };

    return (
        <AnimatePresence>
            {alertMessage && (
                <motion.div
                    className='alert'
                    initial='initial' // Framer Motion settings
                    animate='animate'
                    exit='exit'
                    variants={{
                        initial: popupAnimation.initial,
                        animate: popupAnimation.animate,
                        exit: popupAnimation.exit,
                    }}
                    transition={popupAnimation.transition}
                    key='alert'
                >
                    <div className='alert__overlay'>
                        <div className='alert__popup'>
                            <div className='alert__content'>
                                <h2>Oops!</h2>
                                <p className='alert__message'>{alertMessage}</p>
                                <Button
                                    onClickAction={handleClick}
                                    variant='primary'
                                    testId='dismiss-button'
                                    ariaLabel='close popup'
                                >
                                    OK
                                </Button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
