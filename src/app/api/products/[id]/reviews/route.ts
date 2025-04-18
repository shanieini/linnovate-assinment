import { getReviewsByProductId } from "@/lib/api";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
    const reviews = await getReviewsByProductId(params.id);

    return NextResponse.json(reviews);
}
