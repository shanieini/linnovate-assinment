export async function addReview(data: {
    productId: string;
    author: string;
    rating: number;
    comment: string;
}): Promise<void> {
    const res = await fetch("/api/reviews", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to add review");
    }
}
