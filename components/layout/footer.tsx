import { Facebook, Github, Instagram, Twitter } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
    const year = new Date()

    return (
        <footer className="p-4 bg-white sm:p-6 dark:bg-gray-800">
            <div className="mx-auto max-w-screen-xl">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <Link href="https://ocelot-team-ten.vercel.app/" className="flex items-center">
                            <img src="" className="mr-3 h-8" alt="Ocelot Team Logo" />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                                Ocelot Team
                            </span>
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Company</h2>
                            <ul className="text-gray-600 dark:text-gray-400">
                                <li className="mb-4">
                                    <a href="/company/ourTeam" className="hover:underline">Team</a>
                                </li>
                                <li>
                                    <a href="/company/blog" className="hover:underline">Blog</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow us</h2>
                            <ul className="text-gray-600 dark:text-gray-400">
                                <li className="mb-4">
                                    <Link href="#" className="hover:underline ">Twitter</Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:underline">Discord</Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                            <ul className="text-gray-600 dark:text-gray-400">
                                <li className="mb-4">
                                    <a href="#" className="hover:underline">Privacy Policy</a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">Terms &amp; Conditions</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                        © {year.getFullYear()}
                        <Link href="https://flowbite.com" className="hover:underline"> Ocelot Team</Link>.
                        All Rights Reserved.
                    </span>
                    <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0 transition-all">
                        <Link href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                            <Facebook className='w-5 h-5' />
                        </Link>
                        <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                            <Instagram className='w-5 h-5' />
                        </a>
                        <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                            <Twitter className='w-5 h-5' />
                        </a>
                        <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                            <Github className='w-5 h-5' />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer