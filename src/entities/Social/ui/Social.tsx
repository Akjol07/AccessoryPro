import Text from "@/shared/ui/Text/Text";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { FC } from "react";

interface Props {
  icon: StaticImageData;
  title: string;
  url: string;
}

const Social: FC<Props> = ({ icon, title, url }) => {
  return (
    <Link
      href={url}
      target="_blank"
      className="border-secondary-bright bg-bg-secondary animate-def hover:bg-disabled active:bg-bg-secondary flex w-full max-w-[292px] items-center justify-center gap-[9px] rounded-[24px] border-2 px-[5px] py-[7px]"
    >
      <Image
        src={icon}
        alt={title}
        className="max-500:flex-[0_0_21px] max-500:h-[21px] h-[12px] w-[12px] shrink-0"
      />
      <Text className="max-500:hidden">{title}</Text>
    </Link>
  );
};

export default Social;
