import { FC, HTMLAttributes, PropsWithChildren, createElement } from "react";

import { cn } from "@/shared/helpers/helpers";

type ElementType =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "span"
  | "p"
  | "button";
type TextSizesType = 61 | 49 | 39 | 31 | 25 | 20 | 16 | 15 | 13 | 10;

interface Props extends HTMLAttributes<HTMLElement> {
  size?: TextSizesType;
  element?: ElementType;
}

export const getSizes = (size: TextSizesType) => ({
  "text-[61px]": size === 61,
  "text-[49px] leading-[58px]": size === 49,
  "text-[39px] leading-[43px]": size === 39,
  "text-[31px]": size === 31,
  "text-[25px]": size === 25,
  "text-[20px] leading-[24px]": size === 20,
  "text-[16px] leading-[19.2px]": size === 16,
  "text-[15px] leading-[20px]": size === 15,
  "text-[13px] leading-[15.6px]": size === 13,
  "text-[10px]": size === 10,
});

const Text: FC<PropsWithChildren<Props>> = ({
  element = "span",
  children,
  size = 13,
  ...props
}) => {
  return createElement(
    element,
    {
      ...props,
      className: cn(getSizes(size), props.className),
    },
    children,
  );
};

export default Text;
