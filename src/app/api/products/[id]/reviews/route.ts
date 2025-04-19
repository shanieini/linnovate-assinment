import { getReviewsByProductId } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    _req: NextRequest,
    context: { params: { id: string } }
) {
    const { id } = context.params;

    try {
        const reviews = await getReviewsByProductId(id);
        return NextResponse.json(reviews);
    } catch (error) {
        console.error(`Failed to fetch reviews for product ${id}:`, error);
        return NextResponse.json(
            { message: "Failed to fetch reviews" },
            { status: 500 }
        );
    }
}
