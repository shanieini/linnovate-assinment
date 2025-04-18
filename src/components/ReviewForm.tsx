"use client";

import { useState } from "react";
import { addReview } from "@/lib/clientApi";

type Props = {
    productId: string;
};

export default function AddReviewForm({ productId }: Props) {
    const [author, setAuthor] = useState("");
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);

        try {
            await addReview({
                productId,
                author,
                rating,
                comment,
            });

            setAuthor("");
            setRating(5);
            setComment("");
            setSuccess(true);
        } catch (err) {
            console.error("Error submitting review:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                    className="w-full border rounded p-2 bg-white dark:bg-zinc-800 dark:border-zinc-700"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Rating</label>
                <select
                    className="w-full border rounded p-2 bg-white dark:bg-zinc-800 dark:border-zinc-700"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                >
                    {[5, 4, 3, 2, 1].map((num) => (
                        <option key={num} value={num}>
                            {num} ⭐
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Comment</label>
                <textarea
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
                className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 disabled:opacity-50"
            >
                {loading ? "Submitting..." : "Submit Review"}
            </button>

            {success && (
                <p className="text-green-600 text-sm mt-2">Review submitted successfully!</p>
            )}
        </form>
    );
}
