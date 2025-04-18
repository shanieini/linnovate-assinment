import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";
import { Product } from "@/models/product";
import { Review } from "@/models/review";

export async function getProducts(): Promise<Product[]> {
    const client = await clientPromise;
    const db = client.db("catalog");
    const products = await db
        .collection<Product>("products")
        .find()
        .toArray();

    return products as Product[];
}

export async function getProductById(id: string): Promise<Product | null> {
    const client = await clientPromise;
    const db = client.db("catalog");

    const product = await db
        .collection<Product>("products")
        .findOne({ _id: new ObjectId(id) });

    return product;
}

export async function getReviewsByProductId(productId: string): Promise<Review[]> {
    const client = await clientPromise;
    const db = client.db("catalog");

    const reviews = await db
        .collection<Review>("reviews")
        .find({ productId: new ObjectId(productId) })
        .sort({ createdAt: -1 })
        .toArray();

    return reviews as Review[];
}

