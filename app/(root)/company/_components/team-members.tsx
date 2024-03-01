import Link from "next/link"
import { FaTelegram, FaFacebook, FaGithub } from "react-icons/fa";

const teamMebers = [
    {
        image: "https://cdn.discordapp.com/attachments/1144462878678724710/1213232878285103144/photo_2022-10-25_18-12-41.jpg?ex=65f4ba2a&is=65e2452a&hm=c49f00fba4d3dfcd8c1e3575e00508378a3548d1347680a4309851d25b256fce&",
        alt: "Katzune Starky",
        name: "Katzune Starky",
        role: "Frontend Developer",
        description: "Software engineer dedicated to web development",
        socialMedia: [
            {
                facebook: "https://www.facebook.com/KatzuneStarky/",
                telegram: "https://t.me/KatzuneStarky",
                github: "https://github.com/KatzuneStarky"
            }
        ]
    },
]

function TeamMembers() {
    return (
        <div>
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
                                teamMebers.map((member, index) => (
                                    <div className="rounded overflow-hidden shadow-md dark:bg-white" key={index}>
                                        <div className="absolute -mt-20 w-full flex justify-center">
                                            <div className="h-32 w-32">
                                                <img src={member.image} className="rounded-full object-cover h-full w-full shadow-md" />
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
                                                        <Link href={social.facebook} className="mx-5">
                                                            <div>
                                                                <FaFacebook className="w-6 h-6" />
                                                            </div>
                                                        </Link>
                                                        <Link href={social.github} className="mx-5">
                                                            <div>
                                                                <FaGithub className="w-6 h-6" />
                                                            </div>
                                                        </Link>
                                                        <Link href={social.telegram} className="mx-5">
                                                            <div>
                                                                <FaTelegram className="w-6 h-6" />
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