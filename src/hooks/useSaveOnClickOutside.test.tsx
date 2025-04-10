import { describe, it, expect, vi } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import { useRef } from "react";

import useSaveOnClickOutside from "./useSaveOnClickOutside";

function TestComponent({
    title,
    newTitle,
    description,
    newDescription,
    onSave,
}: {
    title: string;
    newTitle: string;
    description: string;
    newDescription: string;
    onSave: (newTitle: string, newDescription: string) => void;
}) {
    const ref = useRef<HTMLDivElement | null>(null);
    useSaveOnClickOutside(
        ref,
        title,
        newTitle,
        description,
        newDescription,
        onSave
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
    it("calls handleSave when clicking outside and content has changed", () => {
        const handleSave = vi.fn();

        const { getByTestId } = render(
            <TestComponent
                title='Initial Title'
                newTitle='Changed Title'
                description='Initial Description'
                newDescription='Changed Description'
                onSave={handleSave}
            />
        );

        const outside = getByTestId("outside");
        fireEvent.click(outside);

        expect(handleSave).toHaveBeenCalledWith(
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
                onSave={handleSave}
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
                onSave={handleSave}
            />
        );

        const inside = getByTestId("inside");
        fireEvent.click(inside);

        expect(handleSave).not.toHaveBeenCalled();
    });
});
