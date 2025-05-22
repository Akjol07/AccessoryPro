"use client";

import { cn } from "@/shared/helpers/helpers";
import { usePathname, useRouter } from "next/navigation";
import { FC, PropsWithChildren } from "react";
import { Link } from "react-scroll";

interface Props {
  link: string;
  className?: string;
  offset?: number;
}

const NavLink: FC<PropsWithChildren<Props>> = ({
  link,
  children,
  className = "",
  offset = -160,
}) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Link
      spy
      smooth
      to={link}
      offset={offset}
      duration={500}
      onClick={() => router.push("/")}
      className={cn("[&.active]:text-main cursor-pointer", className, {
        "!text-white": pathname !== "/",
      })}
    >
      {children}
    </Link>
  );
};

export default NavLink;
