import { useRef, useState } from "react";

import { Button } from "./Buttons";

import { useCloseOnClickOutside, usePopupAnimate } from "../hooks";

import { useSortMenuContext } from "../context";

import { IdeaCard, SortOption } from "../types";
import { IconChevron } from "./Icons";
import { sortIdeas } from "../lib/sortIdeas";

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
    const sortMenuRef = useRef<HTMLDivElement | null>(null);

    const { sortChoice, setSortChoice } = useSortMenuContext();

    const handleSort = (option: SortOption) => {
        console.log("sort");

        const sortedCollection = sortIdeas(option, ideaCardCollection);
        setIdeaCardCollection(sortedCollection);
        setShowMenu(false);
        setSortChoice(option);
    };

    // CLOSE ON CLICK OUTSIDE FUNCTIONALITY
    useCloseOnClickOutside(sortMenuContainerRef.current, showMenu, setShowMenu);

    // ANIMATE SORTMENU
    usePopupAnimate(showMenu, sortMenuRef.current);

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

            <div
                ref={sortMenuRef}
                className={`sort-menu__list ${
                    !showMenu && "hidden pointer-events-none"
                }`}
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
            </div>
        </div>
    );
}
