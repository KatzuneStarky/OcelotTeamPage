import prismadb from "@/lib/db";

async function TeamMembers() {
    const teamMembers = await prismadb.teamMeber.findMany({ include: { socialMedia: true } })

    return (
        <div className="h-screen">
            <div className="container flex justify-center mx-auto pt-16">
                <div>
                    <p className="text-gray-500 dark:text-white text-lg text-center font-normal pb-3 capitalize">development team</p>
                    <h1 className="xl:text-4xl text-3xl text-center text-gray-800 dark:text-white/90 font-extrabold pb-6 sm:w-4/6 w-5/6 mx-auto">The Talented People Behind the Scenes of the Organization</h1>
                </div>
            </div>

            <section className="">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
                    <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2 w-full">
                        {teamMembers.map((member) => (
                            <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
                                <img
                                    className="w-1/2 rounded-lg sm:rounded-none sm:rounded-l-lg"
                                    src={member.image || ""}
                                    alt={member.name || ""}
                                />
                                <div className="p-5 w-full">
                                    <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        {member.name}
                                    </h3>
                                    <span className="text-gray-500 dark:text-gray-400">{member.role || ""}</span>
                                    <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">{member.description || ""}</p>
                                    <ul className="flex space-x-4 sm:mt-0">
                                        {member.socialMedia.map((social, index) => (
                                            <li key={index}>
                                                <a href={social.url || ""} className="text-gray-500 hover:text-gray-900 dark:hover:text-white">

                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    )
}

export default TeamMembers