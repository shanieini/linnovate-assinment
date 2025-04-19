import { describe, it, expect } from "vitest";
import { isValidReview } from "./isValidReview";

describe("isValidReview", () => {
    it("should return true for valid author and comment", () => {
        expect(isValidReview("Shani", "This product is really good!")).toBe(true);
    });

    it("should return false for empty author", () => {
        expect(isValidReview("   ", "Nice product")).toBe(false);
    });

    it("should return false for short comment", () => {
        expect(isValidReview("Shani", "Too short")).toBe(false);
    });
});
