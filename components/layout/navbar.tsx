"use client"

import Link from 'next/link'
import { useEffect, useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { ModeToggle } from '../mode-toggle';
import Icon from '../icons';
import { Mail } from 'lucide-react';
import { useOrigin } from '@/hooks/user-origin';
import axios from 'axios';

type NavItem = {
  label: string;
  link?: string;
  children?: NavItem[];
  iconImage?: any
};

export default function Navbar() {
  const origin = useOrigin()
  const [animationParent] = useAutoAnimate();
  const [isSideMenuOpen, setSideMenue] = useState(false);
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${origin}/api/admin/projects`)

      setData(response.data)
    }

    fetchData()
  }, [origin])

  const navItems: NavItem[] = [
    {
      label: "Home",
      link: "/",
      iconImage: <Icon name={"home"} />
    },
    {
      label: "Projects",
      link: "/projects",
      iconImage: <Icon name={"folder"} />,
      children: data.slice(0, 3).map((dt) => ({
        label: dt.name,
        link: `/projects/${dt.id}`,
        iconImage: <Icon name={"app-window"} />,
      }))
    },
    {
      label: "Company",
      link: "/company",
      iconImage: <Icon name={"building"} />,
      children: [
        {
          label: "Our Team",
          link: "/company/ourTeam",
          iconImage: <Icon name={"users-round"} />
        },
        {
          label: "Blog",
          link: "/company/blog",
          iconImage: <Icon name={"newspaper"} />
        }
      ]
    },
    {
      label: "About",
      link: "/about",
      iconImage: <Icon name={"info"} />,
    }
  ]

  function openSideMenu() {
    setSideMenue(true);
  }
  function closeSideMenu() {
    setSideMenue(false);
  }

  return (
    <div className="mx-auto flex  w-full max-w-7xl justify-between px-4 py-5 text-sm">
      <section ref={animationParent} className="flex items-center gap-10">
        {/** <img src={"#"} alt=" logo" /> */}
        {isSideMenuOpen && <MobileNav closeSideMenu={closeSideMenu} />}
        <div className="hidden md:flex items-center gap-4 transition-all">
          {navItems.map((d, i) => (
            <Link
              key={i}
              href={d.link || ""}
              className="relative group px-2 py-3 transition-all justify-center "
            >
              <p className="flex cursor-pointer items-center gap-2 text-neutral-400 group-hover:text-black dark:group-hover:text-white ">
                <span>{d.iconImage}</span>
                <span>{d.label}</span>
                {d.children && (
                  <IoIosArrowDown className=" rotate-180  transition-all group-hover:rotate-0" />
                )}
              </p>

              {/* dropdown */}
              {d.children && (
                <div className="absolute   right-0   top-10 hidden w-auto  flex-col gap-1   rounded-lg bg-white py-3 shadow-md  transition-all group-hover:flex ">
                  {d.children.map((ch, i) => (
                    <Link
                      key={i}
                      href={ch.link || ""}
                      className=" flex cursor-pointer items-center  py-1 pl-6 pr-8  text-neutral-400 hover:text-black  "
                    >
                      {/* image */}
                      {ch.iconImage}
                      {/* item */}
                      <span className="whitespace-nowrap   pl-3 ">
                        {ch.label}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
        {/* navitems */}
      </section>

      {/* right side data */}
      <section className=" hidden md:flex items-center gap-8 ">
        <Link href={"/contact"} className="h-fit text-neutral-400 flex items-center justify-center transition-all hover:text-black dark:hover:text-white">
          <Mail className='mr-2' />
          Contact
        </Link>
        <ModeToggle />
      </section>

      <FiMenu
        onClick={openSideMenu}
        className="cursor-pointer text-4xl md:hidden"
      />
    </div>
  );
}

function MobileNav({ closeSideMenu }: { closeSideMenu: () => void }) {
  const origin = useOrigin()
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${origin}/api/admin/projects`)

      setData(response.data)
    }

    fetchData()
  }, [origin])

  const navItems: NavItem[] = [
    {
      label: "Home",
      link: "/",
      iconImage: <Icon name={"home"} />
    },
    {
      label: "Projects",
      link: "/projects",
      iconImage: <Icon name={"folder"} />,
      children: data.slice(0, 3).map((dt) => ({
        label: dt.name,
        link: `/projects/${dt.id}`,
        iconImage: <Icon name={"app-window"} />,
      }))
    },
    {
      label: "Company",
      link: "/company",
      iconImage: <Icon name={"building"} />,
      children: [
        {
          label: "Our Team",
          link: "/company/ourTeam",
          iconImage: <Icon name={"users-round"} />
        },
        {
          label: "Blog",
          link: "/company/blog",
          iconImage: <Icon name={"newspaper"} />
        }
      ]
    },
    {
      label: "About",
      link: "/about",
      iconImage: <Icon name={"info"} />,
    }
  ]

  return (
    <div className="fixed left-0 top-0 flex h-full min-h-screen w-full justify-end bg-black/60 md:hidden">
      <div className=" h-full w-[65%] bg-white px-4 py-4">
        <section className="flex justify-end">
          <AiOutlineClose
            onClick={closeSideMenu}
            className="cursor-pointer text-4xl text-black"
          />
        </section>
        <div className=" flex flex-col text-base  gap-2 transition-all">
          {navItems.map((d, i) => (
            <SingleNavItem
              key={i}
              label={d.label}
              iconImage={d.iconImage}
              link={d.link}
            >
              {d.children}
            </SingleNavItem>
          ))}
        </div>

        <section className="flex gap-8 mt-4 items-center justify-center">
          <Link href={"/contact"} className="h-fit text-neutral-400 transition-all border px-10 py-2 hover:text-black/90">
            Contact
          </Link>
          <ModeToggle />
        </section>
      </div>
    </div>
  );
}

function SingleNavItem(d: NavItem) {
  const [animationParent] = useAutoAnimate();
  const [isItemOpen, setItem] = useState(false);

  function toggleItem() {
    return setItem(!isItemOpen);
  }

  return (
    <Link
      ref={animationParent}
      onClick={toggleItem}
      href={d.link || ""}
      className="relative   px-2 py-3 transition-all "
    >
      <p className="flex cursor-pointer items-center gap-2 text-neutral-400 group-hover:text-black ">
        <span>{d.label}</span>
        {d.children && (
          // rotate-180
          <IoIosArrowDown
            className={`text-xs transition-all  ${isItemOpen && " rotate-180"}`}
          />
        )}
      </p>

      {/* dropdown */}
      {isItemOpen && d.children && (
        <div className="  w-auto  flex-col gap-1   rounded-lg bg-white py-3   transition-all flex ">
          {d.children.map((ch, i) => (
            <Link
              key={i}
              href={ch.link || ""}
              className=" flex cursor-pointer items-center  py-1 pl-6 pr-8  text-neutral-400 hover:text-black  "
            >
              {/* image */}
              {ch.iconImage && <img src={ch.iconImage} alt="item-icon" />}
              {/* item */}
              <span className="whitespace-nowrap pl-3 ">{ch.label}</span>
            </Link>
          ))}
        </div>
      )}
    </Link>
  );
}