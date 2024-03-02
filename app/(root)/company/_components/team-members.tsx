import prismadb from "@/lib/db";
import Link from "next/link"
import { FaTelegram, FaFacebook, FaGithub } from "react-icons/fa";

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
            <div className="w-full px-10 pt-10">
                <div className="container mx-auto">
                    <div className="lg:flex md:flex sm:flex items-center xl:justify-between flex-wrap md:justify-around sm:justify-around lg:justify-around">
                        <div className="xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5">
                            {
                                teamMembers.map((member) => (
                                    <div className="rounded overflow-hidden shadow-md dark:bg-white" key={member.id}>
                                        <div className="absolute -mt-20 w-full flex justify-center">
                                            <div className="h-32 w-32">
                                                <img src={member.image || ""} className="rounded-full object-cover h-full w-full shadow-md" />
                                            </div>
                                        </div>
                                        <div className="px-6 mt-16">
                                            <div className="font-bold text-3xl text-center text-gray-900 pb-1">{member.name}</div>
                                            <p className="text-gray-800 text-sm text-center">{member.role}</p>
                                            <p className="text-center text-gray-600 text-base pt-3 font-normal">
                                                {member.description}
                                            </p>
                                            <div className="w-full flex justify-center pt-5 pb-5">
                                                {member.socialMedia.map((social, index) => (
                                                    <div key={index} className="w-full flex justify-center pt-5 pb-5 text-gray-900">
                                                        <Link href={social.url || ""} className="mx-5">
                                                            <div>
                                                                <FaFacebook className="w-6 h-6" />
                                                            </div>
                                                        </Link>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeamMembers