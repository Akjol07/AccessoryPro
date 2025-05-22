import Skeleton from "@/shared/ui/Skeleton/Skeleton";
import { FC } from "react";

const SocialSkeleton: FC = () => {
  return (
    <Skeleton
      width={276}
      height={33}
      className="w-full max-w-[276px] !rounded-[24px]"
    />
  );
};

export default SocialSkeleton;
