import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import Card from "./Card";
import { IdeaCard } from "../../types";

const mockCard: IdeaCard = {
    id: "123",
    title: "Test Title",
    description: "Test Description",
    dateCreated: Date.now(),
    dateUpdated: null,
};

describe("Card", () => {
    let handleSaveIdea: ReturnType<typeof vi.fn>;
    let handleDeleteIdea: ReturnType<typeof vi.fn>;
    let handleDragStart: ReturnType<typeof vi.fn>;
    let handleDragOver: ReturnType<typeof vi.fn>;
    let handleDragEnd: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        handleSaveIdea = vi.fn();
        handleDeleteIdea = vi.fn();
        handleDragStart = vi.fn();
        handleDragOver = vi.fn();
        handleDragEnd = vi.fn();
    });

    it("renders with initial values", () => {
        render(
            <Card
                ideaCard={mockCard}
                onSaveIdea={handleSaveIdea}
                onDeleteIdea={handleDeleteIdea}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
                index={0}
            />
        );

        expect(screen.getByDisplayValue("Test Title")).toBeInTheDocument();
        expect(
            screen.getByDisplayValue("Test Description")
        ).toBeInTheDocument();
        expect(screen.queryByText("SAVED!")).not.toBeInTheDocument();
    });
});
