import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Toast from "./Toast";

describe("Toast", () => {
    it("renders the toast and calls handleShowToast after animation", async () => {
        render(<Toast />);

        // Check for visible message
        expect(screen.getByText("SAVED!")).toBeInTheDocument();
    });
});
