import { getBlogsByNumer } from "@/actions/blog/get-blogs-by-number";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const perPage = searchParams.get('perPage')
        const skip = searchParams.get('skip')

        const perPageNumber = perPage ? parseInt(perPage, 10) : undefined;
        const skipNumber = skip ? parseInt(skip, 10) : undefined;

        const data = await getBlogsByNumer(perPageNumber || 0, skipNumber || 0);

        return NextResponse.json(data);
    } catch (error) {
        console.log("[obtenerTotalFletes_GET]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}