import { AnimatePresence, motion } from "framer-motion";

import { Button } from "./Buttons";

type AlertProps = {
    alertMessage: string | null;
    setAlertMessage: (arg: string | null) => void;
    titleRef: HTMLInputElement | null;
};

const animationSettings = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.3, ease: [0, 0.71, 0.2, 1.01] },
};

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
                    initial='initial'
                    animate='animate'
                    exit='exit'
                    variants={{
                        initial: animationSettings.initial,
                        animate: animationSettings.animate,
                        exit: animationSettings.exit,
                    }}
                    transition={animationSettings.transition}
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
