import { describe, it, expect, vi, beforeEach } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import { useRef } from "react";

import useSaveOnClickOutside from "./useSaveOnClickOutside";

function TestComponent({
    title,
    newTitle,
    description,
    newDescription,
    onSave,
    handleToggleToast,
}: {
    title: string;
    newTitle: string;
    description: string;
    newDescription: string;
    onSave: (newTitle: string, newDescription: string) => void;
    handleToggleToast: () => void;
}) {
    const ref = useRef<HTMLDivElement | null>(null);
    useSaveOnClickOutside(
        ref,
        title,
        newTitle,
        description,
        newDescription,
        onSave,
        handleToggleToast
    );

    return (
        <div>
            <div ref={ref} data-testid='inside'>
                Inside
            </div>
            <div data-testid='outside'>Outside</div>
        </div>
    );
}

describe("useSaveOnClickOutside", () => {
    const mockHandleSave = vi.fn();
    const mockToggleToast = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        mockHandleSave.mockClear();
        mockToggleToast.mockClear();
    });

    it("calls handleSave when clicking outside and content has changed", () => {
        const { getByTestId } = render(
            <TestComponent
                title='Initial Title'
                newTitle='Changed Title'
                description='Initial Description'
                newDescription='Changed Description'
                onSave={mockHandleSave}
                handleToggleToast={mockToggleToast}
            />
        );

        const outside = getByTestId("outside");
        fireEvent.click(outside);

        expect(mockHandleSave).toHaveBeenCalledWith(
            "Changed Title",
            "Changed Description"
        );
    });

    it("does not call handleSave if no changes are made", () => {
        const handleSave = vi.fn();

        const { getByTestId } = render(
            <TestComponent
                title='Title'
                newTitle='Title'
                description='Description'
                newDescription='Description'
                onSave={mockHandleSave}
                handleToggleToast={mockToggleToast}
            />
        );

        const outside = getByTestId("outside");
        fireEvent.click(outside);

        expect(handleSave).not.toHaveBeenCalled();
    });

    it("does not call handleSave when clicking inside", () => {
        const handleSave = vi.fn();

        const { getByTestId } = render(
            <TestComponent
                title='Old'
                newTitle='New'
                description='Desc'
                newDescription='New Desc'
                onSave={mockHandleSave}
                handleToggleToast={mockToggleToast}
            />
        );

        const inside = getByTestId("inside");
        fireEvent.click(inside);

        expect(handleSave).not.toHaveBeenCalled();
    });
});
