import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddReviewForm from "./AddReviewForm";
import { vi } from "vitest";

vi.mock("@/lib/clientApi", () => ({
    addReview: vi.fn().mockResolvedValue({}),
}));

import { addReview } from "@/lib/clientApi";

describe("AddReviewForm", () => {
    it("should submit the form and show success message", async () => {
        const mockOnSuccess = vi.fn();

        render(<AddReviewForm productId="123" onSuccess={mockOnSuccess} />);

        fireEvent.change(screen.getByLabelText(/name/i), {
            target: { value: "Shani" },
        });

        fireEvent.change(screen.getByLabelText(/comment/i), {
            target: { value: "This product is amazing!" },
        });

        fireEvent.click(screen.getByLabelText("Rate 5 stars"));

        fireEvent.click(screen.getByRole("button", { name: /submit/i }));

        await waitFor(() => {
            expect(screen.getByText(/review submitted successfully/i)).toBeInTheDocument();
        });

        expect(addReview).toHaveBeenCalledWith({
            productId: "123",
            author: "Shani",
            rating: 5,
            comment: "This product is amazing!",
        });

        expect(mockOnSuccess).toHaveBeenCalled();
    });
});
