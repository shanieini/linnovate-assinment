import { getReviewsByProductId } from "@/lib/api";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
    try {
        const reviews = await getReviewsByProductId(params.id);
        return NextResponse.json(reviews);
    } catch (error) {
        console.error(`Failed to fetch reviews for product ${params.id}:`, error);
        return NextResponse.json(
            { message: "Failed to fetch reviews" },
            { status: 500 }
        );
    }
}
