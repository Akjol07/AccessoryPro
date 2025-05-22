import dynamic from "next/dynamic";
import { FC } from "react";
import LibSkeleton, { SkeletonProps } from "react-loading-skeleton";

const Skeleton: FC<SkeletonProps> = ({ ...props }) => {
  return (
    <LibSkeleton baseColor="#d1d1d1" highlightColor="#f0f0f0" {...props} />
  );
};

export default dynamic(() => Promise.resolve(Skeleton), {
  ssr: false,
});
