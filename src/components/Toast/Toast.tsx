import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

export default function Toast() {
    const controls = useAnimation();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

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
            setIsMounted(false);
        };

        sequence();
    }, [controls, isMounted]);

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
