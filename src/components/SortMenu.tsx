import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useCloseOnClickOutside } from "../hooks";

import { useSortMenuContext } from "../context";

import { sortIdeas } from "../lib";
import { popupAnimation } from "../lib/animations";

import { Button } from "./Buttons";
import { IconChevron } from "./Icons";

import { IdeaCard, SortOption } from "../types";

type SortMenuProps = {
    ideaCardCollection: IdeaCard[];
    setIdeaCardCollection: (arg: IdeaCard[]) => void;
};

export default function SortMenu({
    ideaCardCollection,
    setIdeaCardCollection,
}: SortMenuProps) {
    const [showMenu, setShowMenu] = useState(false);

    const sortMenuContainerRef = useRef<HTMLDivElement | null>(null);

    const { sortChoice, setSortChoice } = useSortMenuContext();

    const handleSort = (option: SortOption) => {
        const sortedCollection = sortIdeas(option, ideaCardCollection);
        setIdeaCardCollection(sortedCollection);
        setShowMenu(false);
        setSortChoice(option);
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
