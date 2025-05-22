"use client";

import { cn } from "@/shared/helpers/helpers";
import {
  Children,
  FC,
  PropsWithChildren,
  RefObject,
  useRef,
  useState,
} from "react";
import { Swiper as SwiperArg } from "swiper";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperProps, SwiperRef, SwiperSlide } from "swiper/react";
import "swiper/css";

interface Props extends SwiperProps {
  name: string;
  isPagination?: boolean;
  isWithShadow?: boolean;
  slideClassName?: string;
  isAdaptive?: boolean;
  swiperClassName?: string;
  sliderClassName?: string;
  ref?: RefObject<SwiperRef>;
}

const Slider: FC<PropsWithChildren<Props>> = ({
  name,
  isPagination,
  children,
  className = "",
  slideClassName = "",
  isWithShadow = true,
  isAdaptive = true,
  swiperClassName = "",
  sliderClassName = "",
  ref: propsRef,
  ...props
}) => {
  const ref = useRef<SwiperRef>(null);
  const [isSliderStart, setIsSliderStart] = useState(true);
  const [isSliderEnd, setIsSliderEnd] = useState(false);

  const defineStartOrEnd = (swiper: SwiperArg) => {
    if (swiper.isBeginning) setIsSliderStart(true);
    else if (isSliderStart) setIsSliderStart(false);

    if (swiper.isEnd) setIsSliderEnd(true);
    else if (isSliderEnd) setIsSliderEnd(false);
  };

  return (
    <>
      <Swiper
        grabCursor
        ref={propsRef || ref}
        slidesPerView="auto"
        onSlideChange={defineStartOrEnd}
        className={cn(
          "before:animate-def mt-20 before:pointer-events-none before:absolute before:top-0 before:bottom-0 before:left-0 before:z-[2] before:w-[100px] before:[background:_linear-gradient(-88.99deg,rgba(24,24,24,0)_0.86%,#181818_99.14%)]",
          "after:animate-def after:pointer-events-none after:absolute after:top-0 after:right-0 after:bottom-0 after:z-[2] after:w-[100px] after:[background:_linear-gradient(88.99deg,rgba(24,24,24,0)_0.86%,#181818_99.14%)]",
          {
            "after:opacity-0": isSliderEnd || !isWithShadow,
            "before:opacity-0": isSliderStart || !isWithShadow,
            "max-tb:!hidden": isAdaptive,
          },
          className,
          swiperClassName,
        )}
        modules={isPagination ? [Pagination] : []}
        pagination={
          isPagination && { clickable: true, el: `.${name}-swiper-pagination` }
        }
        {...props}
      >
        {Children.map(children, (el, key) => (
          <SwiperSlide key={key} className={cn("max-w-fit", slideClassName)}>
            {el}
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        style={!className.match("gap") ? { gap: props.spaceBetween } : {}}
        className={cn(
          "dark-scroll mt-20 hidden overflow-x-scroll pb-[24px]",
          { "max-tb:flex": isAdaptive },
          className,
          sliderClassName,
        )}
      >
        {Children.map(children, (el, key) => (
          <div key={key} className={cn("shrink-0", slideClassName)}>
            {el}
          </div>
        ))}
      </div>
    </>
  );
};

export default Slider;
