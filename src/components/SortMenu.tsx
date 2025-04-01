import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useCloseOnClickOutside } from "../hooks";

import { popupAnimation } from "../lib/animations";

import { Button } from "./Buttons";
import { IconChevron } from "./Icons";
import { SortOption } from "../types";

type SortMenuProps = {
    onSort: (option: SortOption) => SortOption;
};

export default function SortMenu({ onSort }: SortMenuProps) {
    const [showMenu, setShowMenu] = useState(false);
    const [sortChoice, setSortChoice] = useState<SortOption | null>(null);

    const sortMenuContainerRef = useRef<HTMLDivElement | null>(null);

    const handleSort = (option: SortOption) => {
        const sortState = onSort(option);

        if (sortState) {
            setSortChoice(sortState);
            setShowMenu(false);
        }
    };

    // CLOSE ON CLICK OUTSIDE FUNCTIONALITY
    useCloseOnClickOutside(sortMenuContainerRef.current, showMenu, setShowMenu);

    return (
        <div ref={sortMenuContainerRef} className='sort-menu'>
            <Button
                classes='sort-menu__trigger'
                onClickAction={() => setShowMenu(!showMenu)}
                variant='ghost'
            >
                <div className='sort-menu__trigger-content'>
                    <span>Sort {sortChoice && `by: ${sortChoice}`}</span>
                    <IconChevron
                        iconColor='secondary'
                        classes={`transform-200 ${showMenu && "rotate-180"}`}
                    />
                </div>
            </Button>

            <AnimatePresence>
                {showMenu && (
                    <motion.div
                        className='sort-menu__list'
                        initial='initial' // Framer Motion settings
                        animate='animate'
                        exit='exit'
                        variants={{
                            initial: popupAnimation.initial,
                            animate: popupAnimation.animate,
                            exit: popupAnimation.exit,
                        }}
                        transition={popupAnimation.transition}
                    >
                        <button
                            className='sort-menu__list-item'
                            onClick={() => {
                                handleSort("Title");
                            }}
                        >
                            Title
                        </button>
                        <button
                            className='sort-menu__list-item'
                            onClick={() => {
                                handleSort("Date");
                            }}
                        >
                            Date Created
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
