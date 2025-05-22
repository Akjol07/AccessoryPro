"use client";

import { FC } from "react";
import Image from "next/image";
import logoIcon from "@/shared/assets/images/icons/logo.jpg";
import Link from "next/link";
import { links } from "@/shared/constants/constants";
import AuthModalOpen from "@/features/AuthModalOpen/AuthModalOpen";
import NavLink from "./NavLink";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/helpers/helpers";
import { useProfile } from "@/features/Auth/model/useProfile";

const Header: FC = () => {
  const pathname = usePathname();
  const { isAuth } = useProfile();

  return (
    <header className="fixed top-0 right-0 left-0 z-50 w-full bg-black pt-[14px] pb-10 font-semibold">
      <div className="container flex max-w-[1200px] items-center justify-between">
        <NavLink link="main">
          <Image
            src={logoIcon}
            alt="logo"
            className="rounded-circle h-[36px] w-[36px] object-cover"
          />
        </NavLink>
        <ul className="max-tb:hidden max-slt:hidden flex items-center gap-[24px]">
          {links.map(({ title, link }) => (
            <li key={link}>
              <NavLink link={link} className="clickable-text text-[13px]">
                {title}
              </NavLink>
            </li>
          ))}
          {isAuth && (
            <Link
              href="/profile"
              className={cn("clickable-text text-[13px]", {
                "text-main": pathname === "/profile",
              })}
            >
              Profile
            </Link>
          )}
        </ul>
        <div className="flex items-center gap-[30px]">
          <AuthModalOpen className="max-slt:hidden" />
        </div>
      </div>
    </header>
  );
};

export default Header;
