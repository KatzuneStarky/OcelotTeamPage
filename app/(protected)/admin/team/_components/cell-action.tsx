"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import axios from "axios"
import { useState } from "react"
import { AlertModal } from "@/components/modals/alert-modal"
import { toast } from "sonner"
import { TeamMemberColumn } from "./columns"

interface CellActionsProps {
    data: TeamMemberColumn
}

export const CellAction: React.FC<CellActionsProps> = ({
    data
}) => {
    const router = useRouter()
    const params = useParams()

    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id)
        toast.success("")
    }

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/admin/team/${data.id}`)
            router.refresh()
            toast.success("Removed team member")
        } catch (error) {
            toast.error("Something went wrong")
            console.log(error);
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={"ghost"} className="w-8 h-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                        Actions
                    </DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onCopy(data.id)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy team member id
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push(`/api/admin/team/${data.name}`)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Update data
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}
