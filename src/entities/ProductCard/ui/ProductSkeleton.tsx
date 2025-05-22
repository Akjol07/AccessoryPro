import Skeleton from "@/shared/ui/Skeleton/Skeleton";
import { FC } from "react";

interface Props {
  uiType?: "big";
}

const ProductSkeleton: FC<Props> = ({ uiType }) => {
  if (uiType === "big")
    return (
      <div className="overflow-hidden rounded-[8px]">
        <Skeleton width={389} height={200} />
        <div className="px-[12px]">
          <div className="mt-[12px] mb-[16px] flex items-center justify-between">
            <Skeleton width={109} height={15} className="!rounded-[2px]" />
            <Skeleton width={95} height={15} className="!rounded-[2px]" />
          </div>
          <Skeleton width={120} height={10} />
          <Skeleton width={144} height={10} className="mt-[4px] mb-[8px]" />
          <Skeleton width={370} height={80} />
        </div>
      </div>
    );

  return <Skeleton width={300} height={345} className="!rounded-[8px]" />;
};

export default ProductSkeleton;
