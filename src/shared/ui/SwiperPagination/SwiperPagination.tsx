import { cn } from "@/shared/helpers/helpers";
import { FC } from "react";

interface Props {
  swiper: string;
  isAdaptive?: boolean;
  className?: string;
}

const SwiperPagination: FC<Props> = ({
  swiper,
  isAdaptive = true,
  className = "",
}) => {
  return (
    <div
      className={cn(
        "mt-[24px] flex h-[12px] items-center justify-center gap-10",
        `${swiper}-swiper-pagination`,
        { "max-tb:hidden": isAdaptive },
        className,
      )}
    ></div>
  );
};

export default SwiperPagination;
