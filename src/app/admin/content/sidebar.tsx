"use client";

import React from "react";
import { useEffect, useState } from "react";
import { LogoutCurve, Setting2 } from "iconsax-react";
import { handleSignOut } from "@/actions/signout";
import { cn } from "@/utils";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { SIDEBARLINKS } from "@/libs";

const SideBar = () => {
  const [activeLink, setActiveLink] = useState("");

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const currentPath = pathname?.replace(/^\/([^\/]+).*$/, "$1");

    setActiveLink(currentPath.trim());
  }, [pathname]);
  return (
    <section className="bg-primary  z-[50] w-[0px] md:w-[96px] min-[1140px]:w-[270px] hover:w-[270px] hover:p-4 transition-all duration-300 py-4 min-[1140px]:p-4 hidden md:flex flex-col gap-y-4 items-center justify-between min-[1140px]:items-start fixed h-screen left-0 top-0 overflow-y-auto border-r border-gray-200  sidebar-scroll overflow-x-hidden group select-none">
      <Link
        href="/"
        className=" max-[1140px]:w-full group-hover:w-full h-[53px]"
      >
        <Image src="/logo.svg" alt="Logo" width={155} height={53} />
      </Link>
      <ul className="flex flex-col gap-y-4 pt-8">
        {SIDEBARLINKS.map((link) => (
          <Link
            href={`/${link.link}`}
            aria-current={activeLink === link.link ? "page" : undefined}
            key={link.id}
            onKeyUp={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setActiveLink(link.link);
                return;
              }
            }}
            tabIndex={0}
            aria-label={link.label}
            className={cn(
              "flex items-center gap-x-3 py-2 px-3 h-[52px] text-[#fdfffd] font-medium text-base transition-colors duration-300 cursor-pointer ",
              activeLink === link.link
                ? "bg-primary-light   text-white rounded outline-none active"
                : "hover:bg-black/10  focus-visible:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
            )}
            onClick={() => setActiveLink(link.link)}
          >
            <link.icon
              size={24}
              aria-hidden
              variant={activeLink === link.link ? "Bold" : "Outline"}
            />

            <span className=" max-[1139px]:hidden group-hover:block w-[185px]">
              {link.label}
            </span>
          </Link>
        ))}

        <span className="bg-[#8e8e8e] w-full max-w-[245px] h-[1px] " />
      </ul>

      <form
        action={handleSignOut}
        className="flex flex-col w-full gap-y-6 xl:gap-y-8 pt-4 items-center"
      >
        <button
          tabIndex={0}
          aria-label="logout"
          className={cn(
            "flex flex-nowrap group-hover:w-full min-[1140px]:w-full  min-[1140px]:justify-start items-center gap-x-3 py-2 px-3 h-[52px] text-[#e80000] font-medium text-sm transition-colors duration-300 cursor-pointer hover:bg-black/10   focus-visible:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
          )}
        >
          <LogoutCurve size={24} aria-hidden />
          <span className=" max-[1139px]:hidden group-hover:block">LogOut</span>
        </button>
      </form>
    </section>
  );
};

export default SideBar;
