import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { IdeaCard } from "../types";

import { cardAnimation } from "../lib/animations";

import { formatDateAndTime } from "../lib/utils";
import { Alert, CharacterCountdown, Toast } from "../components";
import { Button, ButtonClose } from "./Buttons";

type IdeaCardProps = {
    ideaCard: IdeaCard;
    onSave: (
        newTitle: string,
        newDescription: string
    ) => {
        status: "success" | "error";
        message?: string;
        previousTitle?: string;
    };
    onDelete: (id: string) => void;
};

export default function Card({ ideaCard, onSave, onDelete }: IdeaCardProps) {
    const { id, title, description, dateCreated, dateUpdated } = ideaCard;

    const [newTitle, setNewTitle] = useState(title);
    const [newDescription, setNewDescription] = useState(description);
    const [showToast, setShowToast] = useState(false);
    const [alertMessage, setAlertMessage] = useState<string | null>(null);

    const ideaCardRef = useRef<HTMLDivElement | null>(null);
    const titleRef = useRef<HTMLInputElement>(null);

    const isNewCard = !dateCreated; // If it has a dateCreated value, it's not a new card; and vice-versa

    const handleSave = () => {
        const result = onSave(newTitle, newDescription);

        if (result.status === "error") {
            setAlertMessage(result.message || "Something went wrong");
            setNewTitle(result.previousTitle ?? title);
        } else {
            setShowToast(true);
        }
    };

    // TITLE FOCUS ON NEW CARD
    useEffect(() => {
        if (isNewCard && titleRef.current) titleRef.current.focus();
    }, [titleRef, isNewCard]);

    // SAVE IDEA ON CLICK OUTSIDE
    useEffect(() => {
        if (!ideaCardRef.current) return;

        console.log("save on click outside");

        const ideaCardElement = ideaCardRef.current;

        const handleClickOutside = (e: MouseEvent) => {
            if (
                (title !== newTitle || description !== newDescription) &&
                !ideaCardElement.contains(e.target as Node)
            ) {
                handleSave();
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            console.log("remove on click outside");
            document.removeEventListener("click", handleClickOutside);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [description, title, newTitle, newDescription]);

    return (
        <AnimatePresence>
            <motion.div
                className='card'
                ref={ideaCardRef}
                layout // Framer Motion settings
                initial='initial'
                animate='animate'
                exit='exit'
                variants={cardAnimation}
                transition={cardAnimation.transition}
                key={`card-${id}`}
                id={`card-${id}`}
            >
                <Alert
                    alertMessage={alertMessage}
                    setAlertMessage={setAlertMessage}
                    titleRef={titleRef.current}
                />
                {/* DELETE BUTTON */}
                <ButtonClose
                    classes={"card__close-button"}
                    onClickAction={() => onDelete(id)}
                    iconColor='orange-deep'
                />
                <div className='card__fields'>
                    <label
                        className={`card__input-label ${
                            isNewCard ? "opacity-1" : "opacity-0"
                        }`}
                        htmlFor={`title-${title}`}
                    >
                        Idea title
                    </label>
                    <input
                        className='card__title'
                        ref={titleRef}
                        value={newTitle}
                        id={`title-${title}`}
                        name={`title-${title}`}
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
                </div>
                <div>
                    <label
                        className={`card__input-label ${
                            isNewCard ? "opacity-1" : "opacity-0"
                        }`} // if already saved once, no need for labels
                        htmlFor={`description-${title}`}
                    >
                        Description
                    </label>
                    <textarea
                        className={`card__description ${!isNewCard && newDescription.length === 0 ? "bg-secondary" : ""}`}
                        value={newDescription}
                        id={`description-${title}`}
                        name={`description-${title}`}
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
                        isEditingDescription={description !== newDescription}
                    />
                </div>
                {/* SAVE BUTTON */}
                <div className='card__buttons'>
                    {(title !== newTitle || description !== newDescription) && ( // show if card is being edited
                        <Button variant='primary' onClickAction={handleSave}>
                            Save
                        </Button>
                    )}
                </div>
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
                {showToast && <Toast setShowToast={setShowToast} />}
            </motion.div>
        </AnimatePresence>
    );
}
