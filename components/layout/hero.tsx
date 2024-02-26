"use client"

import Lottie from "lottie-react"
import animation from "../../assets/images/developTeam.json"
import Link from "next/link"
import { Contact, FolderKanban, MoveRight, Sparkles } from "lucide-react"
import { Button } from "../ui/moving-border"
import { motion } from "framer-motion";

const textVariants = {
    initial: {
        x: -500,
        opacity: 0,
    },
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 1,
            staggerChildren: 0.1,
        },
    },
};

const HeroSection = () => {
    return (
        <div className="mx-auto px-4 py-32 md:py-32 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8">
            <div className="flex flex-col items-center justify-between lg:flex-row">
                <div className="">
                    <motion.div
                        className="lg:max-w-2xl lg:pr-5"
                        variants={textVariants}
                        initial="initial"
                        animate="animate"
                    >
                        <motion.p
                            className="flex text-sm uppercase"
                            variants={textVariants}
                        >
                            <Sparkles className="mr-1 inline h-5 w-5" />
                            we create software for the furry fandom
                        </motion.p>
                        <motion.h2
                            className="mb-6 max-w-lg text-5xl font-bold leading-snug 
                                tracking-tight sm:text-7xl sm:leading-snug"
                            variants={textVariants}
                        >
                            Taking your creativity
                            <motion.span
                                className="m-1 inline-block border-b-8 border-red-400 text-white 
                                    dark:border-white bg-orange-400 px-4 font-bold "
                                variants={textVariants}
                            >
                                further
                            </motion.span>
                        </motion.h2>
                        <motion.p
                            className="text-base text-gray-400"
                            variants={textVariants}
                        >
                            We are a company passionate about the furry fandom, dedicated to developing innovative software that empowers and connects this vibrant community. From mobile apps to web platforms, our goal is to provide unique and exciting tools that enrich the online furry experience, promoting creativity, inclusivity and camaraderie at all times.
                        </motion.p>
                    </motion.div>
                    <motion.div className="mt-10 flex flex-col items-center md:flex-row" variants={textVariants}>
                        <Link href={"/contact"} className="mr-2">
                            <Button
                                borderRadius="1.75rem"
                                className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
                            >
                                <Contact className="mr-1 inline h-5 w-5" />
                                Contact Us
                            </Button>
                        </Link>
                        <Link href="/projects">
                            <Button
                                borderRadius="1.75rem"
                                className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
                            >
                                <FolderKanban className="mr-1 inline h-5 w-5" />
                                Our Projects
                                <MoveRight className="ml-2 inline h-5 w-5" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>
                <div className="relative hidden lg:ml-32 lg:block lg:w-1/2">
                    <Lottie animationData={animation} />
                </div>
            </div>
        </div>
    )
}

export default HeroSection