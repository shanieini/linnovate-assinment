import { describe, it, expect } from "vitest";
import { calculateAverageRating } from "./calculateAverageRating";

describe("calculateAverageRating", () => {
    it("should return 0 for empty array", () => {
        expect(calculateAverageRating([])).toBe(0);
    });

    it("should return correct average", () => {
        expect(calculateAverageRating([4, 5, 3])).toBeCloseTo(4);
    });

    it("should return 5 for [5,5,5]", () => {
        expect(calculateAverageRating([5, 5, 5])).toBe(5);
    });

    it("should round correctly", () => {
        expect(calculateAverageRating([4, 4, 5])).toBeCloseTo(4.33, 2);
    });
});
