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

export async function fetchProduct(productId: string) {
    const res = await fetch(`/api/products/${productId}`);
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to fetch product: ${res.status} ${text}`);
    }
    return res.json();
}

export async function fetchProductReviews(productId: string) {
    const res = await fetch(`/api/products/${productId}/reviews`);
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to fetch reviews: ${res.status} ${text}`);
    }
    return res.json();
}
