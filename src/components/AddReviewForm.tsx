"use client";
import React from "react";
import { useState } from "react";
import { addReview } from "@/lib/clientApi";
import { mutate } from "swr";
import { AddReviewFormProps } from "@/types/reviewTypes";

export default function AddReviewForm({ productId, onSuccess }: AddReviewFormProps) {
    const [author, setAuthor] = useState("");
    const [rating, setRating] = useState(5);
    const [hoverRating, setHoverRating] = useState<number | null>(null);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);

        try {
            await addReview({ productId, author, rating, comment });
            await mutate("/api/products");

            setAuthor("");
            setRating(5);
            setComment("");
            setSuccess(true);

            onSuccess?.();
        } catch (err) {
            console.error("Error submitting review:", err);
        } finally {
            setLoading(false);
        }
    };

    const displayRating = hoverRating ?? rating;

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="review-author" className="block text-sm font-medium mb-1">
                    Name
                </label>
                <input
                    id="review-author"
                    className="w-full border rounded p-2 bg-white dark:bg-zinc-800 dark:border-zinc-700"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Rating</label>
                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((num) => (
                        <button
                            key={num}
                            type="button"
                            onClick={() => setRating(num)}
                            onMouseEnter={() => setHoverRating(num)}
                            onMouseLeave={() => setHoverRating(null)}
                            className="focus:outline-none cursor-pointer"
                            aria-label={`Rate ${num} stars`}
                        >
                            <span
                                className={`text-2xl transition-colors ${num <= displayRating ? "text-yellow-500" : "text-gray-300"
                                    }`}
                            >
                                ⭐
                            </span>
                        </button>
                    ))}
                </div>
                <p className="text-sm text-zinc-500 mt-1">{rating} out of 5</p>
            </div>

            <div>
                <label htmlFor="review-comment" className="block text-sm font-medium mb-1">
                    Comment
                </label>
                <textarea
                    id="review-comment"
                    className="w-full border rounded p-2 bg-white dark:bg-zinc-800 dark:border-zinc-700"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    required
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 disabled:opacity-50  cursor-pointer"
            >
                {loading ? "Submitting..." : "Submit Review"}
            </button>

            {success && (
                <p className="text-green-600 text-sm mt-2">Review submitted successfully!</p>
            )}
        </form>
    );
}
