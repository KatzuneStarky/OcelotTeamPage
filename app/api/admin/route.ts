import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
) {
    try {
        const user = await currentUser()
        if (!user?.id) return new NextResponse("Unauthenticated", { status: 403 });
        if (user?.role != "ADMIN") return new NextResponse("Unauthorized", { status: 403 });

        if (user.role === "ADMIN") {
            return NextResponse.json("You are an admin");
        }else {
            return new NextResponse("Unauthorized", { status: 403 });
        }
    } catch (error) {
        console.log('[CLIENTES_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};