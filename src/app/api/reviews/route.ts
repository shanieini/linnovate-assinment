import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { productId, author, rating, comment } = body;

        const client = await clientPromise;
        const db = client.db("catalog");

        // 1. שמירת הביקורת
        const newReview = {
            productId: productId,
            author,
            rating,
            comment,
            createdAt: new Date(),
        };

        await db.collection("reviews").insertOne(newReview);

        // 2. חישוב ממוצע דירוגים חדשים
        const agg = await db.collection("reviews").aggregate([
            { $match: { productId: productId } },
            { $group: { _id: null, avgRating: { $avg: "$rating" } } },
        ]).toArray();

        const newAvg = agg[0]?.avgRating || rating;

        // 3. עדכון מוצר עם ממוצע חדש
        await db.collection("products").updateOne(
            { _id: productId },
            { $set: { rating: newAvg } }
        );

        return NextResponse.json({ message: "Review added successfully", review: newReview }, { status: 201 });
    } catch (err) {
        console.error("Error adding review:", err);
        return NextResponse.json({ message: "Failed to add review" }, { status: 500 });
    }
}
