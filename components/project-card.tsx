"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowTopRightIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ProjectCardProps {
    id: string,
    imageUrl?: string,
    name: string,
    website?: string,
    technologies?: string,
    github?: string
}

const ProjectCard = ({
    id,
    imageUrl,
    name,
    website,
    technologies,
    github
}: ProjectCardProps) => {

    return (
        <div className="p-1">
            <Card className="p-4">
                <CardHeader>
                    <CardTitle>{name}</CardTitle>
                    <CardDescription className="mt-1">
                        {website}
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex aspect-square items-center justify-center mt-4">
                    <img
                        className="w-full"
                        src={imageUrl || ""}
                        alt={name}
                    />
                </CardContent>
                <CardFooter className="flex items-center justify-center gap-4 w-full">
                    <Button>
                        <Link href={`/projects/${id}`} className="flex items-center justify-center">
                            <EyeOpenIcon /> Details
                        </Link>
                    </Button>
                    <Button variant="link">
                        <Link href={github || ""} target="_blank" className="flex items-center justify-center">
                            Source code <ArrowTopRightIcon />
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default ProjectCard