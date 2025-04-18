"use client";

import { useState } from "react";
import ReviewForm from "./ReviewForm";

type Props = {
    productId: string;
};

export default function AddReviewModal({ productId }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition w-full sm:w-auto"
            >
                Add Review
            </button>

            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl w-full max-w-md relative shadow-xl">
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-white text-lg"
                        >
                            ✕
                        </button>
                        <h3 className="text-xl font-bold mb-4 text-zinc-900 dark:text-white">הוספת ביקורת</h3>
                        <ReviewForm productId={productId} />
                    </div>
                </div>
            )}
        </>
    );
}
