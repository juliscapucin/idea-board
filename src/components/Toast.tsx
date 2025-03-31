import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

type ToastProps = {
    setShowToast: (arg: boolean) => void;
};

export default function Toast({ setShowToast }: ToastProps) {
    const controls = useAnimation();

    useEffect(() => {
        // Entrance animation
        controls.start({
            y: "-180%",
            transition: { duration: 0.1, ease: "easeOut" },
        });

        // Exit animation after delay
        const timer = setTimeout(() => {
            controls
                .start({
                    x: "200%",
                    transition: { duration: 0.1, ease: "easeIn" },
                })
                .then(() => setShowToast(false));
        }, 1000);

        return () => clearTimeout(timer);
    }, [controls, setShowToast]);

    return (
        <motion.div
            className='toast'
            initial={{ y: 0, x: 0 }}
            animate={controls}
        >
            <p className='toast__text'>SAVED!</p>
        </motion.div>
    );
}
