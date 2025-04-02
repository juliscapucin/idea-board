import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

type ToastProps = {
    setShowToast: (arg: boolean) => void;
};

export default function Toast({ setShowToast }: ToastProps) {
    const controls = useAnimation();

    useEffect(() => {
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
            setShowToast(false);
        };

        sequence();
    }, [controls, setShowToast]);

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
