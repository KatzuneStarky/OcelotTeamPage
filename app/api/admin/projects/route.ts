import { NextResponse } from 'next/server';
import prismadb from '@/lib/db';
import { currentUser } from '@/lib/auth';

export async function POST(
    req: Request
) {
    try {
        const user = await currentUser()

        const body = await req.json();

        const { imageUrl, name, website, technologies, github } = body;

        if (!user?.id) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }

        if (user?.role != "ADMIN") {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        if (user.role === "ADMIN") {
            const projects = await prismadb.projects.create({
                data: {
                    imageUrl,
                    name,
                    website,
                    technologies,
                    github
                }
            });

            return NextResponse.json(projects);
        } else {
            return new NextResponse("Unauthorized", { status: 403 });
        }
    } catch (error) {
        console.log('[TEAM-MEMBER_POST]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function GET(
    req: Request,
) {
    try {
        const user = await currentUser()
        if (!user?.id) return new NextResponse("Unauthenticated", { status: 403 });
        if (user?.role != "ADMIN") return new NextResponse("Unauthorized", { status: 403 });

        const projects = await prismadb.projects.findMany();

        return NextResponse.json(projects);
    } catch (error) {
        console.log('[CLIENTES_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};