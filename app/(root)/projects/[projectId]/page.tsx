import SubTitle from '@/components/layout/title'
import { Button } from '@/components/ui/button'
import prismadb from '@/lib/db'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { TbWorld } from "react-icons/tb";
import { IconName } from '../../company/_components/icon-name'

interface PageProps {
    params: {
        projectId: string,
    }
}

function generateColors() {
    const lightColors = ['#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA', '#9ED2F6', '#A7A9CF', '#E2C2C6', '#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA', '#9ED2F6', '#A7A9CF', '#E2C2C6', '#FF9AA2', '#FFB7B2'];
    const darkColors = ['#3C2C57', '#4B3F72', '#695D87', '#7B7987', '#A8A7A7', '#E0CFCF', '#BFA8A4', '#9D8189', '#5B5B5B', '#3C2C57', '#4B3F72', '#695D87', '#7B7987', '#A8A7A7', '#E0CFCF', '#BFA8A4', '#9D8189', '#5B5B5B', '#3C2C57', '#4B3F72'];

    return { lightColors, darkColors };
}

function getContrastColor(hexColor: string) {
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    return brightness >= 128 ? '#000000' : '#FFFFFF';
}

const ProjectPage = async ({ params }: PageProps) => {
    const { projectId } = params
    const { lightColors, darkColors } = generateColors();

    const project = await prismadb.projects.findUnique({ where: { id: projectId }, include: { technologies: true } })

    return (
        <main className="m-10">
            <div className="mb-4 md:mb-0 w-full mx-auto relative">
                <div className="p-4 lg:px-0">
                    <h2 className="text-4xl font-semibold leading-tight">
                        {project?.name}
                    </h2>
                </div>
                <img src={project?.imageUrl} className="w-full object-cover lg:rounded" />
            </div>

            <div className="flex flex-col lg:flex-row lg:space-x-12">
                <div className="px-4 lg:px-0 mt-12 text-lg leading-relaxed w-full lg:w-3/4">
                    <p className="pb-6">
                        <div dangerouslySetInnerHTML={{ __html: project?.content || "" }} />
                    </p>
                </div>

                <div className="w-full lg:w-1/4 m-auto mt-12 max-w-screen-sm">
                    <div className="p-4 border-t border-b md:border md:rounded">
                        <p className="font-semibold text-xl text-center">Technologies used</p>
                        <div className='grid grid-cols-2 gap-4 p-5'>
                            {project?.technologies.map((data, index) => {
                                const lightColor = lightColors[index];
                                const darkColor = darkColors[index];
                                const textColorForLight = getContrastColor(lightColor);
                                const textColorForDark = getContrastColor(darkColor);
                                return (
                                    <p className="font-semibold text-sm flex items-center justify-center p-4 rounded-sm"
                                        style={{
                                            backgroundColor: lightColor,
                                            color: textColorForLight,
                                        }}
                                        key={index}
                                    >
                                        <div className='mr-2'>
                                            <IconName name={data.icon} />
                                        </div>
                                        {data.name}
                                    </p>
                                )
                            })}
                        </div>
                        <div className='flex items-center justify-between'>
                            <Button
                                className="px-2 py-1 flex w-full 
                                    items-center justify-center rounded">
                                <Link href={project?.github || ""} target='_blank' className='flex items-center justify-center'>
                                    <FaGithub className='mr-2' />
                                    Source Code
                                </Link>
                            </Button>

                            <Button
                                className="ml-5 px-2 py-1 flex w-full 
                                    items-center justify-center rounded"
                            >
                                <Link href={project?.website || ""} target='_blank' className='flex items-center justify-center'>
                                    <TbWorld className='mr-2' />
                                    Website
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    )
}

export default ProjectPage