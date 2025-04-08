import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import Toast from "./Toast";

describe("Toast", () => {
    it("renders the toast and calls handleShowToast after animation", async () => {
        const mockHandleShowToast = vi.fn();

        render(<Toast handleShowToast={mockHandleShowToast} />);

        // Check for visible message
        expect(screen.getByText("SAVED!")).toBeInTheDocument();

        // Wait for the animation to complete
        await waitFor(
            () => {
                expect(mockHandleShowToast).toHaveBeenCalled();
            },
            { timeout: 1600 }
        );
    });
});
