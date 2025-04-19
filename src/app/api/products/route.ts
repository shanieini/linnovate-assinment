import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
    try {
        const db = await getDb();
        const products = await db.collection("products").find({}).toArray();
        return NextResponse.json(products);
    } catch (error) {
        console.error("❌ Failed to fetch products:", error);
        return NextResponse.json(
            { error: "Failed to fetch products" },
            { status: 500 }
        );
    }
}
