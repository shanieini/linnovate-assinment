import { getProductById } from "@/lib/api";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
    try {
        const product = await getProductById(params.id);
        if (!product) {
            return NextResponse.json({ message: "Not found" }, { status: 404 });
        }
        return NextResponse.json(product);
    } catch (error) {
        console.error(`Failed to fetch product with id ${params.id}:`, error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
