"use client"

import { FaUser } from "react-icons/fa"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { useCurrentUser } from "@/hooks/use-current-user"
import { Button } from "../ui/button"
import { Power, User } from "lucide-react"
import { useRouter } from "next/navigation"
import { logout } from "@/actions/auth/logout"

const UserButton = () => {
    const user = useCurrentUser()
    const router = useRouter()

    const onClick = () => {
        logout()
    }   

    return (
        <DropdownMenu >
            <DropdownMenuTrigger className="z-[1000]">
                <Avatar>    
                    <AvatarImage src={user?.image || ""} />
                    <AvatarFallback>
                        <FaUser />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-[1000]">
            <DropdownMenuItem>
                <Button onClick={() => router.push("/profile")} variant={"ghost"} className='p-1.5 text-gray-500 focus:outline-nones transition-colors duration-200 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100'>
                    <User /> Profile
                </Button> 
                </DropdownMenuItem>
                <DropdownMenuItem>
                <Button onClick={onClick} variant={"ghost"} className='p-1.5 text-gray-500 focus:outline-nones transition-colors duration-200 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100'>
                    <Power /> Logout
                </Button> 
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserButton