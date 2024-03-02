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
        }else {
            return new NextResponse("Unauthorized", { status: 403 });
        }
    } catch (error) {
        console.log('[CLIENTES_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

{/**

export async function PATCH(
    req: Request,
    { params }: { params: { clienteId: string, areaId: string } }
) {
    try {
        const user = await currentUser()

        const body = await req.json();

        const { name, activo } = body;

        if (!user?.id) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }

        if (!params.clienteId) {
            return new NextResponse("Product id is required", { status: 400 });
        }

        const storeByUserId = await prismadb.area.findFirst({
            where: {
                id: params.areaId,
                userId: user?.id
            }
        });

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 405 });
        }

        const product = await prismadb.clientes.update({
            where: {
                id: params.clienteId
            },
            data: {
                name,
                activo,
            },
        })

        return NextResponse.json(product);
    } catch (error) {
        console.log('[CLIENTE_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};
*/}