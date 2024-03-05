import { NextResponse } from "next/server";
import prismadb from "@/lib/db";
import { currentUser } from "@/lib/auth";

export async function GET(
    req: Request,
    { params }: { params: { teamId: string } }
) {
    try {
        const teamMember = await prismadb.teamMeber.findUnique({
            where: {
                id: params.teamId
            }
        });

        return NextResponse.json(teamMember);
    } catch (error) {
        console.log('[TEAM_MEMBER_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function DELETE(
    req: Request,
    { params }: { params: { teamId: string } }
) {
    try {
        const user = await currentUser()

        if (!user?.id) return new NextResponse("Unauthenticated", { status: 403 });
        if (user?.role != "ADMIN") return new NextResponse("Unauthorized", { status: 403 });

        if (user.role === "ADMIN") {
            const teamMember = await prismadb.teamMeber.delete({
                where: {
                    id: params.teamId,
                },
            });

            return NextResponse.json(teamMember);
        } else {
            return new NextResponse("Unauthorized", { status: 403 });
        }
    } catch (error) {
        console.log('[TEAM_MEMBER_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function PATCH(
    req: Request,
    { params }: { params: { teamId: string } }
) {
    try {
        const user = await currentUser()

        const body = await req.json();

        const { image, name, role, description, socialMedia } = body;

        if (!user?.id) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }

        if (user?.role != "ADMIN") {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        if (user.role === "ADMIN") {
            console.log(socialMedia)

            const formattedSocialMediaDelete = socialMedia.map((item: { teamMemberId: string, name: string, url: string }) => ({
                where: {
                    teamMemberId: params.teamId
                },
                data: {
                    name: item.name,
                    url: item.url
                }
            }));

            const formattedSocialMedia = socialMedia.map((item: { name: string, url: string }) => ({
                name: item.name,
                url: item.url
            }));

            const member = await prismadb.teamMeber.update({
                where: {
                    id: params.teamId
                },
                data: {
                    image,
                    name,
                    role,
                    description,
                    socialMedia: {
                        deleteMany: formattedSocialMediaDelete,
                        create: formattedSocialMedia
                    }
                },
                include: {
                    socialMedia: true
                }
            })

            console.log(member)
            return NextResponse.json(member);
        } else {
            return new NextResponse("Unauthorized", { status: 403 });
        }
    } catch (error) {
        console.log('[TEAM_MEMBER_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};