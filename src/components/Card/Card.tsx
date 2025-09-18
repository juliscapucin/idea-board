import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { IdeaCard } from "../../types";

import { cardAnimation } from "../../lib/animations";

import { formatDateAndTime } from "../../lib/utils";
import { CharacterCountdown, Toast } from "..";
import { Button, ButtonClose } from "../Buttons/Buttons";
import { useSaveOnClickOutside } from "../../hooks";

type IdeaCardProps = {
    ideaCard: IdeaCard;
    containerDimensions?: DOMRect | null;
    onSaveIdea: (newTitle: string, newDescription: string) => void;
    onDeleteIdea: (id: string) => void;
};

export default function Card({
    ideaCard,
    containerDimensions,
    onSaveIdea,
    onDeleteIdea,
}: IdeaCardProps) {
    const { id, title, description, dateCreated, dateUpdated } = ideaCard;

    const [newTitle, setNewTitle] = useState(title);
    const [newDescription, setNewDescription] = useState(description);
    const [showToast, setShowToast] = useState<boolean>(false);
    const [dragConstraints, setDragConstraints] = useState<
        false | Partial<DOMRect> | React.RefObject<Element> | undefined
    >(undefined);

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

    // DRAG CONSTRAINTS
    useEffect(() => {
        if (!containerDimensions || !ideaCardRef.current) return;

        const cardRect = ideaCardRef.current.getBoundingClientRect();

        setDragConstraints({
            top: -(cardRect.top - containerDimensions.top), // how far up the card can go
            left: -(cardRect.left - containerDimensions.left), // how far left
            right: containerDimensions.right - cardRect.right, // how far right
            bottom: containerDimensions.bottom - cardRect.bottom, // how far down
        });
    }, [containerDimensions]);

    return (
        <AnimatePresence>
            <motion.div
                className={`card ${isNewCard ? "card--new" : ""}`}
                ref={ideaCardRef}
                key={`card-${id}`}
                id={`card-${id}`}
                data-testid={`card-${id}`}
                layout // Framer Motion settings
                initial='initial'
                animate='animate'
                exit='exit'
                variants={cardAnimation}
                transition={cardAnimation.transition}
                drag
                dragConstraints={dragConstraints}
                dragTransition={{ bounceStiffness: 10, bounceDamping: 200 }}
                whileTap={{ cursor: "grabbing" }}
            >
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

                    <div>
                        <label
                            className={`card__input-label ${
                                isNewCard ? "opacity-1" : "opacity-0"
                            }`} // if already saved once, no need for labels
                            htmlFor={`description-${id}`}
                        >
                            Description
                        </label>
                        <textarea
                            className={`card__description ${!isNewCard && newDescription.length === 0 ? "bg-secondary" : ""}`}
                            value={newDescription}
                            id={`description-${id}`}
                            name={`description-${id}`}
                            placeholder='Idea description here'
                            maxLength={140}
                            rows={4}
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
                    <div className='card__buttons'>
                        {(title !== newTitle ||
                            description !== newDescription) && ( // show if card is being edited
                            <Button
                                variant='primary'
                                aria-label='save idea'
                                type='submit'
                            >
                                Save
                            </Button>
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
            </motion.div>
        </AnimatePresence>
    );
}
