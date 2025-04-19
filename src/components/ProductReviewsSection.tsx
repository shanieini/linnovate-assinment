"use client";

import ReviewList from "./ReviewList";
import AddReviewModal from "./AddReviewModal";
import { useEffect, useState } from "react";
import { fetchProduct, fetchProductReviews } from "@/lib/clientApi";
import type { Review } from "@/models/review";
import { ProductReviewsSectionProps } from "@/types/productTypes";


export default function ProductReviewsSection({ productId }: ProductReviewsSectionProps) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [rating, setRating] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [fetchedReviews, product] = await Promise.all([
                fetchProductReviews(productId),
                fetchProduct(productId),
            ]);

            setReviews(fetchedReviews);
            setRating(product.rating);
        } catch (err) {
            console.error("Failed to fetch reviews or product:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [productId]);

    const displayRating =
        typeof rating === "number"
            ? Number.isInteger(rating)
                ? rating
                : rating.toFixed(1)
            : "N/A";

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow p-6 sm:p-8 max-h-[640px] overflow-y-auto flex flex-col">
            <h2 className="text-2xl font-bold text-zinc-800 dark:text-white mb-4">💬 Reviews</h2>

            {loading ? (
                <div className="flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
                    <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                    Loading reviews...
                </div>
            ) : reviews.length > 0 ? (
                <ReviewList reviews={reviews} />
            ) : (
                <p className="text-zinc-500 dark:text-zinc-400 italic text-sm">
                    No reviews yet. Be the first to leave one!
                </p>
            )}

            <div className="sticky bottom-0 mt-4 pt-4 bg-gradient-to-t from-white dark:from-zinc-900">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <AddReviewModal productId={productId} onReviewAdded={fetchData} />

                    {!loading && typeof rating === "number" && (
                        <span className="text-yellow-500 text-lg">
                            {"⭐".repeat(Math.round(rating))}
                            <span className="text-sm text-zinc-500 dark:text-zinc-400 ml-1">
                                ({displayRating})
                            </span>
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
