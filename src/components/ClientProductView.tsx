"use client";

import { useState } from "react";
import { Product } from "@/models/product";
import { Review } from "@/models/review";
import ReviewList from "./ReviewList";
import AddReviewModal from "./AddReviewModal";

type Props = {
    product: Product;
    initialReviews: Review[];
};

export default function ClientProductView({ product, initialReviews }: Props) {
    const [reviews, setReviews] = useState(initialReviews);

    return (
        <main className="min-h-screen bg-gradient-to-b from-sky-100 via-white to-blue-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 text-zinc-800 dark:text-white px-6 py-10">
            <div className="max-w-4xl mx-auto space-y-8">

                <div className="bg-white dark:bg-zinc-900 rounded-xl shadow p-6 sm:p-10">
                    <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover rounded-lg mb-6" />
                    <h1 className="text-4xl font-bold mb-2 text-zinc-900 dark:text-white">
                        {product.name}
                    </h1>
                    {product.category && (
                        <p className="text-sm uppercase text-zinc-500 dark:text-zinc-400 tracking-widest mb-2">
                            {product.category}
                        </p>
                    )}
                    <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-4">{product.description}</p>
                    <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                            {product.price} ₪
                        </span>
                        <span className="text-yellow-500 text-lg">⭐ {product.rating}</span>
                    </div>
                </div>

                <section className="bg-white dark:bg-zinc-900 rounded-xl shadow p-6 sm:p-8 space-y-6">
                    <h2 className="text-2xl font-semibold text-zinc-800 dark:text-white">💬 Reviews</h2>
                    <ReviewList reviews={reviews} />
                    <AddReviewModal
                        productId={product._id?.toString() || ""}
                        onReviewAdded={(review) => setReviews((prev) => [review, ...prev])}
                    />
                </section>
            </div>
        </main>
    );
}
