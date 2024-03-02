import prismadb from "@/lib/db"
import { TeamForm } from "./_components/team-form"

interface PageProps {
    params: {
        teamId: string,
    }
}

const page = async ({ params }: PageProps) => {
    const { teamId } = params

    const teamMember = await prismadb.teamMeber.findFirst({ where: { id: teamId } })
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <TeamForm initialData={teamMember} />
            </div>
        </div>
    )
}

export default page