"use client"

import UserButton from "@/components/auth/user-button";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
    const [nav, setNav] = useState<boolean>(false);

    const handleResize = () => {
        if (window.innerWidth >= 768) { // Assuming 768px is your md breakpoint
            setNav(false);
        }
    };

    // Set up event listener for window resize
    useEffect(() => {
        window.addEventListener('resize', handleResize);

        // Clean up the event listener
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const links = [
        {
            id: 1,
            name: "web home",
            link: "/"
        },
        {
            id: 2,
            name: "admin home",
            link: "/admin"
        },
        {
            id: 3,
            name: "team",
            link: "/admin/team"
        },
        {
            id: 4,
            name: "projects",
            link: "/admin/projects"
        },
        {
            id: 5,
            name: "blog",
            link: "/admin/blog"
        },
        {
            id: 6,
            name: "testimonials",
            link: "/admin/testimonial"
        },    
        {
            id: 7,
            name: "settings",
            link: "/admin/settings"
        },     
    ];

    return (
        <div className="flex justify-between items-center w-full h-20 px-4 bg-slate-200 dark:bg-slate-800 fixed nav">
            <div>                
                <h1 className="text-5xl font-signature ml-2">
                    <Link
                        className="link-underline link-underline-black"
                        href=""
                        target="_blank"
                        rel="noreferrer"
                    >
                        Ocelot Team
                    </Link>
                </h1>
            </div>

            <ul className="hidden md:flex items-center justify-center">
                {links.map(({ id, link, name }) => (
                    <li
                        key={id}
                        className="nav-links px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 link-underline"
                    >
                        <Link href={link}>{name}</Link>
                    </li>
                ))}
                <li className="mr-2">
                    <UserButton />
                </li>
                <li className="mr-2">
                    <ModeToggle />
                </li>
            </ul>

            <div
                onClick={() => setNav(!nav)}
                className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
            >
                {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
            </div>

            {nav && (
                <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500">
                    {links.map(({ id, link }) => (
                        <li
                            key={id}
                            className="px-4 cursor-pointer capitalize py-6 text-4xl"
                        >
                            <Link onClick={() => setNav(!nav)} href={link}>
                                {link}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Navbar;