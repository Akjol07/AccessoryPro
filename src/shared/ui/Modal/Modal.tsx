"use client";

import * as ReactDOM from "react-dom";

import { FC, PropsWithChildren, useEffect, useState } from "react";

import Button from "../Button/Button";
import { ButtonUiType } from "@/shared/types/types";
import Image from "next/image";
import Text from "../Text/Text";
import arrowLeftIcon from "@/shared/assets/images/icons/arrow-left-bold.svg";
import { cn } from "@/shared/helpers/helpers";
import crossIcon from "@/shared/assets/images/icons/cross.svg";
import { useDisableScroll } from "@/shared/hooks/useDisableScroll";

interface Props {
  isOpen: boolean;
  close: () => void;
  title?: string;
  titleClassName?: string;
  titleWrapperClassName?: string;
  closeBtnClassName?: string;
  closable?: boolean;
  className?: string;
  onBack?: () => void;
  isHandleScroll?: boolean;
  modalClassName?: string;
  closeBtnUyType?: ButtonUiType;
  isCloseOnClickAway?: boolean;
  isAttachedDown?: boolean;
  wrapperClassName?: string;
}

const Modal: FC<PropsWithChildren<Props>> = ({
  isOpen,
  title,
  titleClassName = "",
  titleWrapperClassName = "",
  modalClassName = "",
  closeBtnClassName = "",
  closable,
  onBack,
  close,
  children,
  className = "",
  isHandleScroll = true,
  closeBtnUyType,
  isCloseOnClickAway = true,
  isAttachedDown = true,
  wrapperClassName = "",
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const { isTouchScreen } = useDisableScroll({ isOpen, isHandleScroll });

  useEffect(() => {
    let closingTomeout: ReturnType<typeof setTimeout>;

    if (isOpen) {
      setIsMounted(true);
    } else {
      closingTomeout = setTimeout(() => setIsMounted(false), 200);
    }

    return () => {
      clearTimeout(closingTomeout);
    };
  }, [isOpen]);

  if (isMounted)
    return ReactDOM.createPortal(
      <div
        onMouseDown={() => isCloseOnClickAway && close()}
        className={cn(
          "animate-def modal animate-opacity fixed top-0 right-0 bottom-0 left-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.4)] px-[8px] !transition-opacity",
          {
            "pointer-events-none opacity-0": !isOpen,
            "!pr-0": !isOpen && !isTouchScreen && isHandleScroll,
            "max-640:px-0 max-640:items-end": isAttachedDown,
          },
          modalClassName,
        )}
      >
        <div
          onMouseDown={(e) => e.stopPropagation()}
          className={cn(
            "relative max-h-[640ppx] w-full max-w-[818px] rounded-[18px] bg-black p-20 shadow-[0px_4px_16px_0px_#00000066]",
            {
              "max-640:translate-y-[100%]": !isOpen && isAttachedDown,
              "max-640:h-[80vh] animate-def max-640:animate-mob-modal max-640:rounded-[18px_18px_0_0] duration-700":
                isAttachedDown,
            },
            className,
          )}
        >
          {(!!title || onBack) && (
            <div
              className={cn(
                "flex items-center gap-[4px] pt-[6px]",
                titleWrapperClassName,
              )}
            >
              {onBack && (
                <button
                  onClick={onBack}
                  className="flex h-[24px] w-[24px] items-center justify-center"
                >
                  <Image src={arrowLeftIcon} alt="arrow-left" />
                </button>
              )}
              {title && (
                <Text
                  size={20}
                  element="h3"
                  className={cn("font-bold", titleClassName)}
                >
                  {title}
                </Text>
              )}
            </div>
          )}

          {closable && (
            <Button
              uiType={closeBtnUyType || "neutral"}
              onClick={close}
              className={cn(
                "absolute top-20 right-20 z-20 !p-[12.51px]",
                closeBtnClassName,
              )}
            >
              <Image src={crossIcon} alt="cross" className="min-w-[11px]" />
            </Button>
          )}
          {isAttachedDown ? (
            <div
              className={cn(
                "max-640:overflow-y-auto scroll-none-tb",
                wrapperClassName,
              )}
            >
              {children}
            </div>
          ) : (
            children
          )}
        </div>
      </div>,
      document.body,
    );
};

export default Modal;
