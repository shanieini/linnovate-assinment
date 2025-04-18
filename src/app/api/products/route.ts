import clientPromise from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("catalog");
        const products = await db.collection("products").find({}).toArray();

        return NextResponse.json(products);
    } catch (err) {
        console.error("❌ MongoDB error:", err);
        return NextResponse.json({ error: "DB connection failed" }, { status: 500 });
    }
}
