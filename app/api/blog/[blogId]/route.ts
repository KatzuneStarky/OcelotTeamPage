import { NextResponse } from "next/server";
import prismadb from "@/lib/db";
import { currentUser } from "@/lib/auth";

export async function GET(
    req: Request,
    { params }: { params: { blogId: string } }
) {
    try {
        const blog = await prismadb.blog.findUnique({
            where: {
                id: params.blogId
            }
        });

        return NextResponse.json(blog);
    } catch (error) {
        console.log('[BLOG_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function DELETE(
    req: Request,
    { params }: { params: { blogId: string } }
) {
    try {
        const user = await currentUser()

        if (!user?.id) return new NextResponse("Unauthenticated", { status: 403 });
        if (user?.role != "ADMIN") return new NextResponse("Unauthorized", { status: 403 });

        if (user.role === "ADMIN") {
            const blog = await prismadb.blog.delete({
                where: {
                    id: params.blogId,
                },
            });

            return NextResponse.json(blog);
        } else {
            return new NextResponse("Unauthorized", { status: 403 });
        }
    } catch (error) {
        console.log('[BLOG_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function PATCH(
    req: Request,
    { params }: { params: { blogId: string } }
) {
    try {
        const user = await currentUser()

        const body = await req.json();

        const { title, coverImage, content, category, isArchived, isPublished } = body;

        if (!user?.id) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }

        if (user?.role != "ADMIN") {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        if (user.role === "ADMIN") {
            const blogs = await prismadb.blog.update({
                where: {
                    id: params.blogId
                },
                data: {
                    title,
                    content,
                    category,
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
        console.log('[BLOG_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};