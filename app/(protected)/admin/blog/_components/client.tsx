"use client"

{ /** Icons */ }
import { ArrowLeft, FileImage, Plus } from "lucide-react"

{ /** Components */ }
import { Button } from "@/components/ui/button"

{ /** Hooks */ }
import { useParams, useRouter } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/data-table"
import { Heading } from "@/components/layout/heading"
import { useCurrentUser } from "@/hooks/use-current-user"
import { BlogColumn, columns } from "./columns"

interface BlogClientPorps {
    data: BlogColumn[]
}

export const BlogClient: React.FC<BlogClientPorps> = ({
    data
}) => {
    const router = useRouter()
    const params = useParams()
    const user = useCurrentUser()

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Blog posts (${data.length})`}
                    description="Manage blogs data"
                />
                <div>
                    {
                        user?.role === "ADMIN" && (
                            <Button
                                onClick={() => router.push(`/admin/blog/new`)}
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
                serachKey="title"
            />
        </>
    )
}