import { describe, it, expect } from "vitest";
import { createIdea } from "../lib/createIdea";
import { IdeaCard } from "../types";
import { mockIdeaCard } from "../test-utils/mocks";

describe("createIdea", () => {
    // xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
    // Total: 36 characters,
    // Hyphens: 4 (at fixed positions),
    // Version digit: Always 4 (for UUID v4),
    // Variant digit: Always one of 8, 9, a, or b
    const idRegex = /^[\da-f]{8}-([\da-f]{4}-){3}[\da-f]{12}$/;

    it("adds a new empty idea card at the beginning of the collection", () => {
        // Arrange: fake existing collection
        const existingCollection: IdeaCard[] = [mockIdeaCard];

        // Act
        const result = createIdea(existingCollection);

        // Assert
        expect(result.length).toBe(2);
        const newCard = result[0];

        expect(newCard).toMatchObject({
            title: "",
            description: "",
            dateCreated: null,
            dateUpdated: null,
        });

        expect(typeof newCard.id).toBe("string");
        expect(newCard.id).not.toBe(existingCollection[0].id);
        expect(result[1].id).toBe(mockIdeaCard.id);
        expect(newCard.id).toMatch(idRegex);
    });

    it("returns a single idea card when passed an empty array", () => {
        const result = createIdea([]);

        expect(result.length).toBe(1);
        const newCard = result[0];

        expect(newCard).toMatchObject({
            title: "",
            description: "",
            dateCreated: null,
            dateUpdated: null,
        });
        expect(typeof newCard.id).toBe("string");
        expect(newCard.id).toMatch(idRegex);
    });
});
