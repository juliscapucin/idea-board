import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Alert from "../components/Alert";

describe("Alert", () => {
    it("renders when alertMessage is provided", () => {
        const mockSetAlertMessage = vi.fn();

        render(
            <Alert
                alertMessage='Test message'
                setAlertMessage={mockSetAlertMessage}
                titleRef={null}
            />
        );

        expect(screen.getByText("Oops!")).toBeInTheDocument();
        expect(screen.getByText("Test message")).toBeInTheDocument();
        expect(screen.getByTestId("dismiss-button")).toBeInTheDocument();
    });

    it("calls setAlertMessage and focuses input when clicking OK", async () => {
        const mockSetAlertMessage = vi.fn();
        const mockFocus = vi.fn();

        const inputRef = {
            focus: mockFocus,
        } as unknown as HTMLInputElement;

        render(
            <Alert
                alertMessage='Another message'
                setAlertMessage={mockSetAlertMessage}
                titleRef={inputRef}
            />
        );

        const dismissButton = screen.getByTestId("dismiss-button");
        await userEvent.click(dismissButton);

        expect(mockSetAlertMessage).toHaveBeenCalledWith(null);
        expect(mockFocus).toHaveBeenCalled();
    });

    it("does not render when alertMessage is null", () => {
        const mockSetAlertMessage = vi.fn();
        const { container } = render(
            <Alert
                alertMessage={null}
                setAlertMessage={mockSetAlertMessage}
                titleRef={null}
            />
        );

        expect(container.firstChild).toBeNull();
    });
});
