import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import Toast from "./Toast";

describe("Toast", () => {
    it("renders the toast and calls showToast after animation", async () => {
        const mockShowToast = vi.fn();
        render(<Toast showToast={mockShowToast} />);

        expect(screen.getByText("SAVED!")).toBeInTheDocument();

        // Wait for showToast(false) to be called after animation
        await waitFor(
            () => {
                expect(mockShowToast).toHaveBeenCalledWith(false);
            },
            { timeout: 2000 }
        );
    });
});
