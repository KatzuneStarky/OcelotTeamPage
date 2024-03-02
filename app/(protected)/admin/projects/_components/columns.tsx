"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

export type ProjectsColumn = {
    id: string
    name?: string
    imageUrl?: string
    website?: string
    technologies?: string
    github?: string
}

export const columns: ColumnDef<ProjectsColumn>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Project name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "website",
        header: "Website",
    },
    {
        accessorKey: "technologies",
        header: "Technologies",
    },
    {
        accessorKey: "github",
        header: "Github",
    },
    {
        header: "Actions",
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />
    },
]
