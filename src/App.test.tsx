import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { IdeaCard } from "./types";

vi.mock("./lib/createIdea", () => ({
    createIdea: () => [
        {
            id: "test-123",
            title: "",
            description: "",
            dateCreated: null,
            dateUpdated: null,
        },
    ],
}));

vi.mock("./lib/saveIdea", () => ({
    saveIdea: ({
        card,
        newTitle,
        newDescription,
        ideaCardCollection,
    }: {
        card: IdeaCard;
        newTitle: string;
        newDescription: string;
        ideaCardCollection: IdeaCard[];
    }) => {
        const updatedCollection = ideaCardCollection.map((c) =>
            c.id === card.id
                ? {
                      ...c,
                      title: newTitle,
                      description: newDescription,
                      dateCreated: Date.now(),
                      dateUpdated: Date.now(),
                  }
                : c
        );
        return updatedCollection;
    },
}));

vi.mock("./lib/deleteIdea", () => ({
    deleteIdea: (id: string, collection: IdeaCard[]) =>
        collection.filter((item) => item.id !== id),
}));

vi.mock("./lib/saveToLocalStorage", () => ({
    saveToLocalStorage: vi.fn(),
}));

vi.mock("./lib/sortIdeas", () => ({
    sortIdeas: (_option: string, collection: IdeaCard[]) => collection,
}));

describe("App", () => {
    it("displays 'No ideas' state when empty", () => {
        localStorage.clear();
        render(<App />);
        expect(
            screen.getByText("No ideas in this collection")
        ).toBeInTheDocument();
    });

    it("creates a new idea when clicking the create button", async () => {
        render(<App />);
        const createButton = await screen.findByRole("button", {
            name: "New Idea",
        });

        await userEvent.click(createButton);

        const card = await screen.findByTestId("card-test-123");

        // Check for New card
        expect(card).toBeInTheDocument();

        // Check for input fields + labels
        const titleInput = await screen.findByLabelText("Title");
        const descriptionInput = await screen.findByLabelText("Description");

        expect(titleInput).toBeInTheDocument();
        expect(descriptionInput).toBeInTheDocument();

        const testTitle = "Test Title";
        const testDescription = "Test description";

        // Check for user type action
        await userEvent.clear(titleInput);
        await userEvent.type(titleInput, testTitle);
        await userEvent.clear(descriptionInput);
        await userEvent.type(descriptionInput, testDescription);

        // Check for Save Button
        const saveButton = await screen.findByRole("button", {
            name: "save idea",
        });
        // Save idea
        await userEvent.click(saveButton);

        // Check for input values
        expect(screen.getByDisplayValue(testTitle)).toBeInTheDocument();
        expect(screen.getByDisplayValue(testDescription)).toBeInTheDocument();

        // Delete idea
        const deleteButton = await screen.findByRole("button", {
            name: "delete idea",
        });
        await userEvent.click(deleteButton);

        // Check for card deletion
        expect(
            await screen.queryByTestId("card-test-123")
        ).not.toBeInTheDocument();
    });
});
