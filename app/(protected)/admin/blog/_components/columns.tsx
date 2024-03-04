"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

export type BlogColumn = {
    id: string
    title: string
    content?: string
    isArchived?: boolean
    isPublished?: boolean
}

export const columns: ColumnDef<BlogColumn>[] = [
    {
        accessorKey: "title",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Blog title
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "content",
        header: "Content",
    },
    {
        accessorKey: "isArchived",
        header: "Is Archived?",
    },
    {
        accessorKey: "isPublished",
        header: "Is Published?",
    },
    {
        header: "Actions",
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />
    },
]
