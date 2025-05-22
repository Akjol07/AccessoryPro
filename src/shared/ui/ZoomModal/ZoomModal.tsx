"use client";

import { FC, MouseEvent, RefObject, useEffect, useRef } from "react";
import Image from "next/image";
import { Keyboard, Pagination } from "swiper/modules";
import { SwiperOptions } from "swiper/types";
import Modal from "../Modal/Modal";
import Slider from "../Slider/Slider";
import SwiperPagination from "../SwiperPagination/SwiperPagination";
import { Swiper as SwiperType } from "swiper/types";
import { SwiperRef } from "swiper/react";

interface ZoomModalProps {
  onClose: () => void;
  images: string[];
  activeIndex: number | null;
  isHandleScroll?: boolean;
}

const ZoomModal: FC<ZoomModalProps> = ({
  images,
  activeIndex,
  onClose,
  isHandleScroll,
}) => {
  const swiperRef = useRef<SwiperType>(null);
  const swiperParams: SwiperOptions = {
    direction: "horizontal",
    spaceBetween: 0,
    loop: true,
    ...(activeIndex ? { initialSlide: activeIndex } : {}),
    slidesPerView: 1,
    modules: [Keyboard, Pagination],
    keyboard: {
      enabled: true,
    },
    grabCursor: true,
  };

  const handleSlideClick = (e: MouseEvent<HTMLDivElement>) => {
    const div = e.target as HTMLDivElement;
    const divWidth = div.offsetWidth;
    const clickX = e.clientX - div.getBoundingClientRect().left;

    if (clickX < divWidth / 2) {
      swiperRef.current?.slidePrev();
    } else {
      swiperRef.current?.slideNext();
    }
  };

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Modal
      closable
      close={onClose}
      isOpen={activeIndex !== null}
      isHandleScroll={isHandleScroll}
      onBack={onClose}
      title="Gallery"
      titleWrapperClassName="left-20"
      className="h-[600px]"
    >
      <div className="max-500:bg-none max-tb:p-0 max-tb:flex max-tb:flex-col mt-[14px] h-[480px] rounded-[8px] bg-[linear-gradient(180deg,#252525_0%,#181818_100%)] p-[16px]">
        <div className="max-tb:flex-auto flex items-center">
          <Slider
            name="gallery"
            isWithShadow={false}
            slideClassName="max-w-none max-tb:h-full"
            isPagination
            isAdaptive={false}
            className=""
            ref={swiperRef as unknown as RefObject<SwiperRef>}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            {...swiperParams}
          >
            {images.map((image, key) => (
              <div onClick={handleSlideClick} key={key}>
                <Image
                  alt=""
                  width={449}
                  height={433}
                  src={image}
                  key={key}
                  className="max-tb:h-[350px] max-tb:max-h-none max-h-[433px] w-full object-contain"
                />
              </div>
            ))}
          </Slider>
        </div>
        <SwiperPagination swiper="gallery" isAdaptive={false} />
      </div>
    </Modal>
  );
};

export default ZoomModal;
