"use client";

import logoWhiteIcon from "@/shared/assets/images/icons/logo.jpg";
import Image from "next/image";
import Text from "@/shared/ui/Text/Text";
import { social } from "@/shared/constants/constants";
import NavLink from "@/widgets/header/ui/NavLink";
import Social from "@/entities/Social/ui/Social";

const Footer = () => {
  return (
    <footer className="relative bg-[linear-gradient(0deg,rgba(0,0,0,1)_0%,rgba(24,24,24,1)_30%,rgba(36,36,32,1)_100%)] py-40 pb-90">
      <div className="container">
        <NavLink link="main">
          <Image
            width={100}
            src={logoWhiteIcon}
            alt="logo-white"
            className="rounded-circle mx-auto block"
          />
          <h2 className="mt-10 text-center">Аксессуар Про</h2>
        </NavLink>
        <Text size={20} element="h2" className="mt-50 mb-[8px]">
          Our Socials
        </Text>
        <div className="max-tb:gap-[16px] flex justify-between gap-[24px]">
          {social().map((social) => (
            <Social key={social.title} {...social} />
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
