"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowTopRightIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IconName } from "./icon-name";
import { Eye, Github } from "lucide-react";

interface ProjectCardProps {
    id: string,
    imageUrl?: string,
    name: string,
    website?: string,
    content?: string,
    github?: string
    technologies?: any[]
}

const ProjectCard = ({
    id,
    imageUrl,
    name,
    website,
    github,
    content,
    technologies
}: ProjectCardProps) => {

    return (
        <main className="flex items-center justify-center py-10 mx-4">
            <section className="bg-white dark:bg-slate-600 w-full space-y-3 px-6 py-4 rounded-3xl shadow-lg border flex flex-col">
                <img src={imageUrl} className="w-full h-32 object-cover rounded-xl hover:filter hover:brightness-75 transition" />
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold">{name}</h3>
                </div>
                <ul className="space-x-2 grid grid-cols-4 gap-4 items-center justify-center">
                    {technologies?.map((data) => (
                        <li
                            className="bg-blue-400 text-white text-sm text-center 
                                p-2 rounded-sm flex items-center justify-center w-auto"
                            key={data.id}
                        >
                            <div className="mr-2">
                                <IconName name={data.icon} />
                            </div>
                            {data.name}
                        </li>
                    ))}
                </ul>
                <div className="text-gray-600 dark:text-white font-light">
                    <div dangerouslySetInnerHTML={{ __html: content ? content.substring(0, 200) + "..." : "" }} />
                </div>

                <div className="flex items-center justify-between">
                    <Link href={`/projects/${id}`}>
                        <Button className="bg-gray-800 text-white py-1 rounded-2xl flex">
                            <Eye className="mr-2" />
                            Details
                        </Button>
                    </Link>

                    <Link href={github || ""} target="_blank" className="flex items-center justify-between">
                        <Button className="bg-gray-800 text-white py-1 rounded-2xl flex">
                            <Github className="mr-2" />
                            Source code
                        </Button>
                    </Link>
                </div>
            </section>
        </main>
    )
}

export default ProjectCard