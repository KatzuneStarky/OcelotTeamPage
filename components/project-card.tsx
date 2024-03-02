"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowTopRightIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

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
    const router = useRouter();

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
                <CardFooter className="flex gap-4">
                    <Button
                        onClick={() => {
                            router.push(`/projects/${id}`);
                        }}
                    >
                        <EyeOpenIcon /> Details
                    </Button>
                    <Button variant="link">
                        Source code <ArrowTopRightIcon />
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default ProjectCard