"use client";

import { cn } from "@/shared/helpers/helpers";
import { FC } from "react";

interface Props {
  className?: string;
}

const Loader: FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        "rounded-circle animate-rotation h-20 w-20 border-[3px] border-black border-b-transparent",
        className,
      )}
    ></div>
  );
};

export default Loader;
