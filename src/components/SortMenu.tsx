import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useCloseOnClickOutside, useCloseOnFocusOutside } from "../hooks";

import { popupAnimation } from "../lib/animations";

import { Button } from "./Buttons/Buttons";
import { IconChevron } from "./Icons";
import { SortOption } from "../types";

type SortMenuProps = {
    onSort: (option: SortOption | null) => void;
    sortChoice: SortOption | null;
};

export default function SortMenu({ onSort, sortChoice }: SortMenuProps) {
    const [showMenu, setShowMenu] = useState(false);

    const sortMenuContainerRef = useRef<HTMLDivElement | null>(null);

    // SORT
    const handleSort = (option: SortOption) => {
        onSort(option);

        setShowMenu(false);
    };

    // CLOSE ON CLICK OUTSIDE
    useCloseOnClickOutside(sortMenuContainerRef.current, showMenu, setShowMenu);

    // CLOSE ON FOCUS OUTSIDE
    useCloseOnFocusOutside(sortMenuContainerRef.current, showMenu, setShowMenu);

    return (
        <div ref={sortMenuContainerRef} className='sort-menu'>
            <Button
                classes='sort-menu__trigger'
                onClickAction={() => setShowMenu(!showMenu)}
                variant='ghost'
                testId='sort-menu-trigger'
                ariaLabel='sort ideas'
            >
                <div className='sort-menu__trigger-content'>
                    <span>Sort {sortChoice && `by: ${sortChoice}`}</span>
                    <IconChevron
                        iconColor='accent'
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
                        variants={popupAnimation}
                        transition={popupAnimation.transition}
                    >
                        <button
                            className='sort-menu__list-item'
                            onClick={() => {
                                handleSort("Title");
                            }}
                            aria-label='sort by title'
                        >
                            Title
                        </button>
                        <button
                            className='sort-menu__list-item'
                            onClick={() => {
                                handleSort("Date");
                            }}
                            aria-label='sort by date created'
                        >
                            Date Created
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
