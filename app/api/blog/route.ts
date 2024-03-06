import { NextResponse } from 'next/server';
import prismadb from '@/lib/db';
import { currentUser } from '@/lib/auth';

export async function POST(
    req: Request
) {
    try {
        const user = await currentUser()

        const body = await req.json();

        const { title, coverImage, content, isArchived, isPublished } = body;

        if (!user?.id) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }

        if (user?.role != "ADMIN") {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        if (user.role === "ADMIN") {
            const blogs = await prismadb.blog.create({
                data: {
                    title,
                    content,
                    coverImage,
                    isArchived,
                    isPublished
                }
            });

            return NextResponse.json(blogs);
        } else {
            return new NextResponse("Unauthorized", { status: 403 });
        }
    } catch (error) {
        console.log('[BLOG_POST]', error);
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

        if (user.role === "ADMIN") {
            const blogs = await prismadb.blog.findMany();

            return NextResponse.json(blogs);
        }else {
            return new NextResponse("Unauthorized", { status: 403 });
        }
    } catch (error) {
        console.log('[TEAM-MEMBER_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};