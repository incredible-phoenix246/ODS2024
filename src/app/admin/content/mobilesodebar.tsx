/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { handleSignOut } from "@/actions/signout";
import { useStateCtx } from "@/context/StateCtx";
import { cn } from "@/utils";
import { LogoutCurve, Setting2 } from "iconsax-react";
import { useRouter } from "next/navigation";
import { SIDEBARLINKS } from "@/libs";

const ModMobileSidebar = () => {
  const { ShowAdminSidebar, setShowAdminSidebar } = useStateCtx();
  const router = useRouter();

  const [activeLink, setActiveLink] = useState("");

  const pathname = usePathname();
  useEffect(() => {
    const currentPath = pathname?.replace(/^\/([^\/]+).*$/, "$1");

    setActiveLink(currentPath.trim());
  }, [pathname]);

  return (
    <>
      <div
        className={cn(
          "md:hidden fixed min-h-screen w-full bg-black/50 top-0 left-0 z-[99] transition-all duration-300 overflow-hidden",
          ShowAdminSidebar ? "opacity-100" : "opacity-0 pointer-events-none "
        )}
        onClick={() => setShowAdminSidebar(false)}
      />

      <section
        className={cn(
          "py-6 md:hidden  min-[400px]:pl-4 pl-2 flex flex-col w-full max-w-[230px] min-[400px]:max-w-[270px]  items-start bg-primary fixed left-0 top-0 z-[999] h-screen transition-all opacity-0 sidebar-scroll overflow-x-hidden group select-none ",
          ShowAdminSidebar
            ? "translate-x-0 duration-700 opacity-100"
            : "-translate-x-full duration-300 pointer-events-none invisible"
        )}
      >
        <Link
          href="/"
          className="w-full  h-[53px]"
          onClick={() => setShowAdminSidebar(false)}
        >
          <Image src="/logo.svg" alt="Logo" width={155} height={53} />
        </Link>
        <ul className="flex flex-col gap-y-3 min-[400px]:gap-y-4 py-8 mt-6">
          {SIDEBARLINKS.map((link) => (
            <Link
              href={`/${link.link}`}
              aria-current={activeLink === link.link ? "page" : undefined}
              key={link.id}
              onKeyUp={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setActiveLink(link.link);
                  setShowAdminSidebar(false);
                  return;
                }
              }}
              tabIndex={0}
              aria-label={link.label}
              className={cn(
                "flex items-center gap-x-3 py-2 px-3 h-[42px] text-white font-medium text-sm transition-colors duration-300 cursor-pointer ",
                activeLink === link.link
                  ? "bg-white text-primary rounded outline-none"
                  : "hover:bg-black/10 focus-visible:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
              )}
              onClick={() => {
                setActiveLink(link.link);
                setShowAdminSidebar(false);
              }}
            >
              <link.icon
                size={18}
                aria-hidden
                variant={activeLink === link.link ? "Bold" : "Outline"}
              />

              <span className="w-[175px">{link.label}</span>
            </Link>
          ))}

          {/* LogOut */}
          <form
            action={handleSignOut}
            className="flex flex-col w-full gap-y-6 xl:gap-y-8 pt-4 items-center"
          >
            <button
              role="button"
              tabIndex={0}
              aria-label="logout"
              onKeyUp={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  router.push("/");
                  return;
                }
              }}
              className={cn(
                "flex w-full items-center gap-x-3 py-2 px-3 h-[52px] text-[#e80000] font-medium text-base transition-colors duration-300 cursor-pointer hover:bg-black/10 focus-visible:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
              )}
            >
              <LogoutCurve size={18} aria-hidden />
              <span>LogOut</span>
            </button>
          </form>
        </ul>
      </section>
    </>
  );
};

export default ModMobileSidebar;
