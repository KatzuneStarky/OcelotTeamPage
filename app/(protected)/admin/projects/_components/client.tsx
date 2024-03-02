"use client"

{ /** Icons */ }
import { ArrowLeft, FileImage, Plus } from "lucide-react"

{ /** Components */ }
import { Button } from "@/components/ui/button"

{ /** Hooks */ }
import { useParams, useRouter } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/data-table"
import { useCurrentRole } from "@/hooks/use-current-role"
import { Heading } from "@/components/layout/heading"
import { ProjectsColumn, columns } from "./columns"

interface ProjectsClientPorps {
    data: ProjectsColumn[]
}

export const ProjectsClient: React.FC<ProjectsClientPorps> = ({
    data
}) => {
    const router = useRouter()
    const params = useParams()
    const role = useCurrentRole()

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Projects (${data.length})`}
                    description="Administration of data on company projects"
                />
                <div>
                    {
                        role === "ADMIN" && (
                            <Button
                                onClick={() => router.push(`/admin/projects/new`)}
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Add new
                            </Button>
                        )
                    }
                </div>
            </div>
            <Separator />
            <DataTable
                columns={columns}
                data={data}
                serachKey="name"
            />
        </>
    )
}