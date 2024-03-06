import { NextResponse } from "next/server";
import prismadb from "@/lib/db";
import { currentUser } from "@/lib/auth";

export async function GET(
    req: Request,
    { params }: { params: { projectId: string } }
) {
    try {
        const project = await prismadb.projects.findUnique({
            where: {
                id: params.projectId
            },
            include: {
                technologies: true
            }
        });

        return NextResponse.json(project);
    } catch (error) {
        console.log('[PROJECT_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function DELETE(
    req: Request,
    { params }: { params: { projectId: string } }
) {
    try {
        const user = await currentUser()

        if (!user?.id) return new NextResponse("Unauthenticated", { status: 403 });
        if (user?.role != "ADMIN") return new NextResponse("Unauthorized", { status: 403 });

        if (user.role === "ADMIN") {
            const project = await prismadb.projects.delete({
                where: {
                    id: params.projectId,
                },
                include: {
                    technologies: true
                }
            });

            return NextResponse.json(project);
        } else {
            return new NextResponse("Unauthorized", { status: 403 });
        }
    } catch (error) {
        console.log('[PROJECT_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function PATCH(
    req: Request,
    { params }: { params: { projectId: string } }
) {
    try {
        const user = await currentUser()

        const body = await req.json();

        const { image, name, role, description, technologies } = body;

        if (!user?.id) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }

        if (user?.role != "ADMIN") {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        if (user.role === "ADMIN") {
            console.log(technologies)
            const formattedTechnologies = technologies.map((item: { name: string, icon: string }) => ({
                name: item.name,
                icon: item.icon
            }));

            const projectUpdateData = {
                image,
                name,
                role,
                description,
                technologies: {
                    deleteMany: { projectId: params.projectId },
                    create: formattedTechnologies
                }
            };
    
            const updateProject = await prismadb.projects.update({
                where: { id: params.projectId },
                data: projectUpdateData,
                include: { technologies: true }
            });

            console.log(updateProject)

            return NextResponse.json(updateProject);
        } else {
            return new NextResponse("Unauthorized", { status: 403 });
        }
    } catch (error) {
        console.log('[PROJECTS_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};