"use client";

import { useState, useEffect } from "react";
import AddReviewForm from "./AddReviewForm";
import { AddReviewModalProps } from "@/types/reviewTypes";

export default function AddReviewModal({ productId, onReviewAdded }: AddReviewModalProps) {
    const [open, setOpen] = useState(false);

    const handleSuccess = () => {
        setOpen(false);
        onReviewAdded?.();
    };

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition w-full sm:w-auto cursor-pointer"
            >
                Add Review
            </button>

            {open && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 h-dvh"
                    onClick={() => setOpen(false)}
                >
                    <div
                        className="bg-white dark:bg-zinc-900 p-6 rounded-xl w-full max-w-md mx-4 sm:mx-0 relative shadow-xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-white text-lg"
                        >
                            ✕
                        </button>
                        <h3 className="text-xl font-bold mb-4 text-zinc-900 dark:text-white">
                            Add Review
                        </h3>
                        <AddReviewForm productId={productId} onSuccess={handleSuccess} />
                    </div>
                </div>
            )}
        </>
    );
}
