import { useEffect, useState } from "react";

const getFixedElements = () => {
  const allElements = document.querySelectorAll("*");
  return Array.from(allElements).filter((el) => {
    return el.classList.contains("fixed");
  });
};

interface useDisableScrollParams {
  isOpen: boolean;
  isHandleScroll?: boolean;
}

export const useDisableScroll = ({
  isOpen,
  isHandleScroll = true,
}: useDisableScrollParams) => {
  const [isTouchScreen, setIsTouchScreen] = useState(false);

  useEffect(() => {
    const checkTouchScreen = () => {
      setIsTouchScreen(window.matchMedia("(hover: none)").matches);
    };

    checkTouchScreen();
    window.addEventListener("resize", checkTouchScreen);

    return () => window.removeEventListener("resize", checkTouchScreen);
  }, []);

  useEffect(() => {
    if (isHandleScroll) {
      const fixedElements = getFixedElements();
      if (!isTouchScreen) {
        fixedElements.forEach((el) => {
          el.classList.add("pr-[8px]");
        });
      }

      if (isOpen) {
        if (isHandleScroll) document.body.style.overflow = "hidden";
        if (!isTouchScreen) document.body.style.paddingRight = `${8}px`;
      } else {
        if (isHandleScroll) document.body.style.overflow = "";
        document.body.style.paddingRight = "";
        if (!isTouchScreen)
          fixedElements.forEach((el) => {
            el.classList.remove("pr-[8px]");
          });
      }
    }
  }, [isOpen]);

  return { isTouchScreen };
};
