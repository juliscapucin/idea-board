import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

vi.mock("./lib/saveToLocalStorage", () => ({
    saveToLocalStorage: vi.fn(),
}));

describe("App", () => {
    it("displays 'No ideas' state when empty", () => {
        localStorage.clear();
        render(<App />);
        expect(
            screen.getByText("No ideas in this collection")
        ).toBeInTheDocument();
    });

    it("creates a new idea and deletes it", async () => {
        localStorage.clear();
        render(<App />);
        const createButton = await screen.findByRole("button", {
            name: "New Idea",
        });

        await userEvent.click(createButton);

        const testId = /card-/i;
        const cards = await screen.findAllByTestId(testId);

        expect(cards.length).toBe(1); // expect to have only one card at this point

        // Check for New card
        expect(cards[0]).toBeInTheDocument();

        // Check for input fields + labels
        const titleInput = await screen.findByLabelText("Title");
        const descriptionInput = await screen.findByLabelText("Description");

        expect(titleInput).toBeInTheDocument();
        expect(descriptionInput).toBeInTheDocument();

        // Mock user input values
        const testTitle = "Test Title";
        const testDescription = "Test description";

        // User types on input fields
        await userEvent.clear(titleInput);
        await userEvent.type(titleInput, testTitle);
        await userEvent.clear(descriptionInput);
        await userEvent.type(descriptionInput, testDescription);

        // Save Button shows
        const saveButton = await screen.findByRole("button", {
            name: /save idea/i,
        });

        // Save idea click
        await userEvent.click(saveButton);

        // Toast shows
        expect(screen.getByText(/saved/i)).toBeInTheDocument();

        // Animation runs and toast is removed
        await waitFor(
            () => {
                // 'queryByText' returns null if no element is found, so doesn't throw an error
                expect(screen.queryByText(/saved/i)).not.toBeInTheDocument();
            },
            { timeout: 1600 } // animation duration
        );

        // Check for input values
        expect(screen.getByDisplayValue(testTitle)).toBeInTheDocument();
        expect(screen.getByDisplayValue(testDescription)).toBeInTheDocument();

        // Delete idea
        const deleteButton = await screen.findByRole("button", {
            name: /delete idea/i,
        });
        await userEvent.click(deleteButton);

        // Check for card deletion
        expect(await screen.queryByTestId(testId)).not.toBeInTheDocument();
    });
});
