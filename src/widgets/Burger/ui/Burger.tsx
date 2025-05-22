"use client";

import { cn } from "@/shared/helpers/helpers";
import { FC, useEffect, useState } from "react";
import logoIcon from "@/shared/assets/images/icons/logo-white.svg";
import Image from "next/image";
import { Link } from "react-scroll";
import { links, social } from "@/shared/constants/constants";
import AuthModalOpen from "@/features/AuthModalOpen/AuthModalOpen";
import { useDisableScroll } from "@/shared/hooks/useDisableScroll";
import Social from "@/entities/Social/ui/Social";
import SocialSkeleton from "@/entities/Social/ui/SocialSkeleton";

interface Props {
  isContactsLoading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contacts?: any | null;
}

const Burger: FC<Props> = ({ isContactsLoading, contacts }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useDisableScroll({ isOpen });

  return (
    <>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="animate-def max-slt:block relative z-10 hidden h-20 w-20 active:brightness-110"
      >
        <div
          className={cn(
            "bg-main-bright animate-def h-[2px] w-[18px] origin-[31%_31%] rounded-[8px]",
            { "w-20 rotate-[45deg]": isOpen },
          )}
        ></div>
        <div
          className={cn(
            "bg-main-bright animate-def my-[3px] h-[2px] w-[18px] rounded-[8px]",
            { "opacity-0": isOpen },
          )}
        ></div>
        <div
          className={cn(
            "bg-main-bright animate-def h-[2px] w-[18px] origin-[0%_0%] rounded-[8px]",
            {
              "w-[20px] rotate-[-45deg]": isOpen,
            },
          )}
        ></div>
      </button>
      <div
        className={cn(
          "max-slt:fixed max-640:gap-[26px] slt:hidden max-tb:px-[16px] top-60 right-0 bottom-0 left-0 flex flex-col gap-60 bg-[#18181899] px-[26px] py-20 duration-500",
          {
            "translate-x-[100%]": !isOpen,
            "animate-def": isMounted,
          },
        )}
      >
        <div
          className={cn(
            "absolute top-0 right-0 bottom-0 left-0 z-[-1] backdrop-blur-2xl duration-500",
            {
              "opacity-0": !isOpen,
              "delay-[250ms]": isOpen,
            },
          )}
        ></div>
        <Link to="main" smooth duration={500} onClick={() => setIsOpen(false)}>
          <Image src={logoIcon} alt="logo" className="mx-auto" />
        </Link>
        <div className="max-640:order-4 max-640:mt-auto max-640:mb-0 flex gap-[26px]">
          {isContactsLoading
            ? Array.from({ length: 4 }, (_, key) => (
                <SocialSkeleton key={key} />
              ))
            : contacts &&
              social().map((social) => (
                <Social key={social.title} {...social} />
              ))}
        </div>
        <div className="flex flex-col gap-[29px]">
          {links.map(({ title, link }) => (
            <Link
              smooth
              to={link}
              key={title}
              duration={500}
              onClick={() => setIsOpen(false)}
              className="text-[16px] leading-[19px] font-normal"
            >
              {title}
            </Link>
          ))}
        </div>
        <AuthModalOpen
          isHandleScroll={false}
          className="max-tb:py-[12px] mt-[28px] w-full py-[12px] text-[16px] leading-[19px]"
        />
      </div>
    </>
  );
};

export default Burger;
