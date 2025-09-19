import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { IdeaCard, DragElement } from "../../types";

import { cardAnimation } from "../../lib/animations";

import { formatDateAndTime } from "../../lib/utils";
import { CharacterCountdown, Toast } from "..";
import { Button, ButtonClose } from "../Buttons/Buttons";
import { useSaveOnClickOutside } from "../../hooks";

type IdeaCardProps = {
    ideaCard: IdeaCard;
    index: number;
    draggedCard?: DragElement | null;
    dragOverCard?: DragElement | null;
    onDragStart: (card: IdeaCard) => void;
    onDragOver: (card: IdeaCard) => void;
    onDragEnd: () => void;
    onSaveIdea: (newTitle: string, newDescription: string) => void;
    onDeleteIdea: (id: string) => void;
};

export default function Card({
    ideaCard,
    index,
    draggedCard,
    dragOverCard,
    onDragStart,
    onDragOver,
    onDragEnd,
    onSaveIdea,
    onDeleteIdea,
}: IdeaCardProps) {
    const { id, title, description, dateCreated, dateUpdated } = ideaCard;

    const [newTitle, setNewTitle] = useState(title);
    const [newDescription, setNewDescription] = useState(description);
    const [showToast, setShowToast] = useState<boolean>(false);
    const ideaCardRef = useRef<HTMLDivElement | null>(null);
    const titleRef = useRef<HTMLInputElement>(null);

    const isNewCard = !dateCreated; // If it has a dateCreated value, it's not a new card; and vice-versa

    const handleToggleToast = (param: boolean) => {
        setShowToast(param);
    };

    // TITLE FOCUS ON NEW CARD
    useEffect(() => {
        if (isNewCard && titleRef.current) titleRef.current.focus();
    }, [titleRef, isNewCard]);

    // SAVE IDEA ON CLICK OUTSIDE
    useSaveOnClickOutside(
        ideaCardRef,
        title,
        newTitle,
        description,
        newDescription,
        onSaveIdea,
        handleToggleToast
    );

    return (
        <AnimatePresence>
            <motion.div
                ref={ideaCardRef}
                className={`card__container ${draggedCard?.card.id === ideaCard.id ? "card__container--dragged" : ""} ${dragOverCard?.card.id === ideaCard.id ? "card__container--drag-over" : ""}`}
                layout // Framer Motion settings
                initial='initial'
                animate='animate'
                exit='exit'
                variants={cardAnimation}
                transition={cardAnimation.transition}
                data-testid={`card-${id}`}
                draggable
                onDragStart={() => onDragStart(ideaCard)}
                onDragOver={(e) => {
                    e.preventDefault();
                    onDragOver(ideaCard);
                }}
                onDragEnd={() => onDragEnd()}
            >
                {/* DRAG INDICATOR */}

                {dragOverCard && draggedCard && draggedCard.index > index && (
                    <DragIndicator
                        isActive={
                            dragOverCard?.index === index &&
                            draggedCard.index > index
                        }
                        classes={"card__drag-indicator--left"}
                    />
                )}

                <div className={`card ${isNewCard ? "card--new" : ""}`}>
                    {/* DELETE BUTTON */}
                    <ButtonClose
                        classes={"card__close-button"}
                        onClick={() => onDeleteIdea(id)}
                        iconColor='orange-deep'
                        aria-label='delete idea'
                    />
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            onSaveIdea(newTitle, newDescription);
                            setShowToast(true);
                        }}
                        className='card__fields'
                    >
                        <label
                            className={`card__input-label ${
                                isNewCard ? "opacity-1" : "opacity-0"
                            }`}
                            htmlFor={`title-${id}`}
                        >
                            Title
                        </label>
                        <input
                            className='card__title'
                            ref={titleRef}
                            value={newTitle}
                            id={`title-${id}`}
                            name={`title-${id}`}
                            placeholder='My Best Idea'
                            minLength={2}
                            maxLength={50}
                            type='text'
                            required
                            autoComplete='off'
                            onChange={(e) => {
                                setNewTitle(e.target.value);
                            }}
                        />

                        <div className='card__description-container'>
                            <label
                                className={`card__input-label ${
                                    isNewCard ? "opacity-1" : "opacity-0"
                                }`} // if already saved once, no need for labels
                                htmlFor={`description-${id}`}
                            >
                                Description
                            </label>
                            <textarea
                                className={`card__description`}
                                value={newDescription}
                                id={`description-${id}`}
                                name={`description-${id}`}
                                placeholder='Idea description here'
                                maxLength={140}
                                rows={3}
                                autoComplete='off'
                                onChange={(e) => {
                                    setNewDescription(e.target.value);
                                }}
                            />

                            <CharacterCountdown
                                newDescription={newDescription}
                                isEditingDescription={
                                    description !== newDescription
                                }
                            />
                        </div>
                        {/* SAVE BUTTON */}
                        <div className='card__button'>
                            {(title !== newTitle ||
                                description !== newDescription) && (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Button
                                        variant='primary'
                                        aria-label='save idea'
                                        type='submit'
                                    >
                                        Save
                                    </Button>
                                </motion.div>
                            )}
                        </div>
                    </form>
                    <div className='card__dates'>
                        <p className={`${!dateUpdated && "hidden"}`}>
                            Updated:{" "}
                            {dateUpdated
                                ? `${formatDateAndTime(dateUpdated)}`
                                : "-"}
                        </p>
                        <p className={`${!dateCreated && "hidden"}`}>
                            Created:{" "}
                            {dateCreated
                                ? `${formatDateAndTime(dateCreated)}`
                                : "-"}
                        </p>
                    </div>
                    {showToast && <Toast showToast={handleToggleToast} />}
                </div>

                {dragOverCard && draggedCard && draggedCard.index < index && (
                    <DragIndicator
                        isActive={
                            dragOverCard?.index === index &&
                            draggedCard.index < index
                        }
                        classes={"card__drag-indicator--right"}
                    />
                )}
            </motion.div>
        </AnimatePresence>
    );
}

function DragIndicator({
    isActive,
    classes,
}: {
    isActive: boolean | undefined;
    classes: string;
}) {
    return (
        <div
            className={`card__drag-indicator ${isActive ? "opacity-100" : "opacity-0"} ${classes}`}
        ></div>
    );
}
