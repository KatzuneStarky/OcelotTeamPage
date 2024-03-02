import prismadb from "@/lib/db"

export const TeamHero = async() => {
    const teamMembers = await prismadb.teamMeber.findMany()

    return (
        <div>
            <div className="container mx-auto h-screen">
                <div className="flex flex-col lg:flex-row justify-center items-center py-12 mx-4 md:mx-6 ">
                    <div className="lg:w-1/2 flex flex-col justify-center items-center lg:items-start">
                        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 dark:text-white text-center lg:text-left">Meet our team</h1>
                        <p className="text-base leading-normal mt-4 md:w-8/12 lg:w-11/12 text-center lg:text-left">
                            All our collaborators are at the forefront, increasing their knowledge to create the best projects
                        </p>
                    </div>
                    <div role="list" aria-label="Team members" className="lg:w-1/2 grid grid-cols-4 sm:grid-cols-4 md:grid-cols-3 gap-x-12 gap-y-12 md:gap-x-12 mt-10 lg:mt-0 sm:w-auto w-full">
                        {teamMembers.map((item, index) => (
                            <div key={index} role="listitem" className="flex justify-center items-center ">
                                <img src={item.image || ""} className="w-32 h-32 rounded-full object-center" alt={item.name || ""} role="img" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
