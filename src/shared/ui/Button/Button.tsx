"use client";

import { cn } from "@/shared/helpers/helpers";
import { ButtonUiType } from "@/shared/types/types";
import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  createElement,
  FC,
  PropsWithChildren,
  Ref,
} from "react";
import Loader from "../Loader/Loader";

interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    Pick<AnchorHTMLAttributes<HTMLAnchorElement>, "target"> {
  uiType?: ButtonUiType;
  ref?: Ref<HTMLButtonElement>;
  element?: "button" | "a";
  href?: string;
  isLoading?: boolean;
  loaderClassName?: string;
}

const Button: FC<PropsWithChildren<Props>> = ({
  children,
  className,
  uiType = "primary",
  element = "button",
  isLoading,
  loaderClassName = "",
  ...props
}) => {
  return createElement(
    element,
    {
      ...props,
      className: cn(
        "bg-main relative animate-def overflow-hidden hover:bg-main-bright active:bg-main-dark disabled:bg-disabled disabled:text-disabled-text max-tb:py-[8px] cursor-pointer rounded-[8px] px-[16px] py-[8px] text-[13px] leading-[15px] font-medium whitespace-nowrap text-black disabled:pointer-events-none",
        {
          "bg-secondary text-secondary-text hover:bg-secondary-bright active:bg-secondary-dark hover:text-secondary-text-bright active:text-secondary-text-dark":
            uiType === "secondary",
          "bg-bg-secondary hover:bg-bg-secondary-bright active:bg-bg-secondary text-white":
            uiType === "neutral",
          "flex justify-center items-center pointer-events-none": isLoading,
        },
        className,
      ),
    },
    <>{isLoading ? <Loader className={cn(loaderClassName)} /> : children}</>,
  );
};

export default Button;
