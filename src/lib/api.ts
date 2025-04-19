import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";
import { Product } from "@/models/product";
import { Review } from "@/models/review";
import { cache } from "react";

export async function getProducts(): Promise<Product[]> {
    try {
        const client = await clientPromise;
        const db = client.db("catalog");

        const products = await db
            .collection<Product>("products")
            .find()
            .toArray();

        return products;
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return [];
    }
}

export async function getProductById(id: string): Promise<Product | null> {
    try {
        const client = await clientPromise;
        const db = client.db("catalog");

        const product = await db
            .collection<Product>("products")
            .findOne({ _id: new ObjectId(id) });

        return product;
    } catch (error) {
        console.error("Failed to fetch product by ID:", error);
        return null;
    }
}

export const getReviewsByProductId = cache(
    async (productId: string): Promise<Review[]> => {
        try {
            const client = await clientPromise;
            const db = client.db("catalog");

            const reviews = await db
                .collection<Review>("reviews")
                .find({ productId: new ObjectId(productId) })
                .sort({ createdAt: -1 })
                .toArray();

            return reviews;
        } catch (error) {
            console.error("Failed to fetch reviews:", error);
            return [];
        }
    }
);
