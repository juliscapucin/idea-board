import { SortMenu, InstructionsPopup } from "../components";
import { Button } from "./Buttons/Buttons";
import { SortOption } from "../types";
import { IconPlus } from "./Icons";

type HeaderProps = {
    onSort: (option: SortOption | null) => void;
    createNewIdea: () => void;
    sortChoice: SortOption | null;
};

export default function Header({
    onSort,
    createNewIdea,
    sortChoice,
}: HeaderProps) {
    return (
        <div className='header'>
            <InstructionsPopup />
            <h1 className='header__title'>Idea </h1>
            <h1 className='header__title'>Board</h1>
            <div className='header__buttons'>
                {/* ADD NEW IDEA */}
                <Button
                    variant='primary'
                    classes='header__add-button'
                    onClick={createNewIdea}
                >
                    <IconPlus /> New Idea
                </Button>

                {/* SORT DROPDOWN */}
                <SortMenu
                    onSort={(option) => onSort(option)}
                    sortChoice={sortChoice}
                />
            </div>
        </div>
    );
}
