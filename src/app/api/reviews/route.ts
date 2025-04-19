import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/db";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { productId, author, rating, comment } = body;
        const client = await clientPromise;
        const db = client.db("catalog");
        const newReview = {
            productId: new ObjectId(productId),
            author,
            rating,
            comment,
            createdAt: new Date(),
        };

        await db.collection("reviews").insertOne(newReview);

        const agg = await db.collection("reviews").aggregate([
            { $match: { productId: new ObjectId(productId) } },
            { $group: { _id: null, avgRating: { $avg: "$rating" } } },
        ]).toArray();

        const newAvg = agg[0]?.avgRating || rating;

        await db.collection("products").updateOne(
            { _id: new ObjectId(productId) },
            { $set: { rating: newAvg } }
        );

        return NextResponse.json({ message: "Review added successfully", review: newReview }, { status: 201 });
    } catch (err) {
        console.error("Error adding review:", err);
        return NextResponse.json({ message: "Failed to add review" }, { status: 500 });
    }
}
