import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

type ToastProps = {
    showToast: (param: boolean) => void;
};

export default function Toast({ showToast }: ToastProps) {
    const controls = useAnimation();

    // Toast animation sequence
    useEffect(() => {
        if (!showToast) return;

        const sequence = async () => {
            await controls.start({
                opacity: 1,
                y: "-150%",
                transition: { duration: 0.3, ease: "easeOut" },
            });
            await controls.start({
                x: "200%",
                opacity: 0,
                transition: {
                    duration: 0.2,
                    ease: "easeIn",
                    delay: 1, // delay before exit
                },
            });
            showToast(false);
        };

        sequence();
    }, [controls, showToast]);

    return (
        <motion.div
            className='toast'
            initial={{ y: 0, x: 0, opacity: 0 }}
            animate={controls}
        >
            <p className='toast__text'>SAVED!</p>
        </motion.div>
    );
}
