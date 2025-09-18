import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button, ButtonClose } from "./Buttons";

describe("Button", () => {
    it("renders a button, applies classes & and handles clicks", async () => {
        const mockButtonLabel = "Click me";
        const mockExtraClasses = "extra-class-1 extra-class-2";
        const mockOnClickFn = vi.fn();

        render(
            <Button
                variant='primary'
                classes={mockExtraClasses}
                onClick={mockOnClickFn}
            >
                {mockButtonLabel}
            </Button>
        );

        const button = screen.getByRole("button", { name: mockButtonLabel });
        expect(button).toBeInTheDocument();

        await userEvent.click(button);

        expect(button).toHaveClass("button-main");
        expect(button).toHaveClass(mockExtraClasses);
        expect(mockOnClickFn).toHaveBeenCalled();
    });
});

describe("ButtonClose", () => {
    it("renders a close button, applies classes, checks for icon, icon color, aria label & and handles clicks", async () => {
        const mockAriaLabel = "Close";
        const mockIconColor = "orange-deep";
        const mockExtraClasses = "extra-class-1 extra-class-2";
        const mockOnClickFn = vi.fn();

        render(
            <ButtonClose
                iconColor={mockIconColor}
                classes={mockExtraClasses}
                onClick={mockOnClickFn}
                aria-label={mockAriaLabel}
            />
        );

        const buttonClose = screen.getByRole("button");
        const icon = screen.getByTestId("icon-close");

        // Check if rendered
        expect(buttonClose).toBeInTheDocument();
        expect(icon).toBeInTheDocument();

        // Check for aria-label + extra classes
        expect(buttonClose).toHaveAccessibleName(mockAriaLabel);
        expect(buttonClose).toHaveClass(mockExtraClasses);

        // Check for icon color
        Array.from(icon.children).forEach((child) => {
            expect(child.className).toContain(`bg-${mockIconColor}`);
        });

        // Click event
        await userEvent.click(buttonClose);
        expect(mockOnClickFn).toHaveBeenCalled();
    });
});
