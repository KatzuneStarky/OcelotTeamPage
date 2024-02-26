interface ProjectCardProps {
    image?: string,
    title: string,
    description: string,
    techs: string[] | undefined
}

const ProjectCard = ({
    image,
    title,
    description,
    techs = []
}: ProjectCardProps) => {
    return (
        <div className="grid w-[80%] mx-auto pt-[5rem] grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="p-4 rounded-xl relative cursor-pointer hover:-rotate-6 transform transition-all
            duration-200 bg-gray-800 shadow-sm">
                <img
                    src={`${image}`}
                    alt={title}
                    width={500}
                    height={500}
                    className="object-contain rounded-xl mx-auto shadow-md"
                />
            </div>
            <div>
                <h1 className="text-[25px]">{title}</h1>
                <p className="opacity-65 text-[15px] mt-[1rem]">
                    {description}
                </p>
                <div className="mt-[1.3rem] grid-cols-2 grid sm:grid-cols-3 xl:grid-cols-4 gap-[2rem]">
                    {techs.map((tech, index) => (
                        <h1 key={index} className="px-6 py-3 bg-blue-700 rounded-lg text-center">
                            {tech}
                        </h1>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProjectCard