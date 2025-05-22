"use client";

import Image from "next/image";
import { Dispatch, FC, SetStateAction } from "react";
import Text from "@/shared/ui/Text/Text";
import { cn } from "@/shared/helpers/helpers";
import Button from "@/shared/ui/Button/Button";
import { toast } from "react-toastify";
import { IProduct } from "@/shared/types/types";

interface Props extends IProduct {
  uiType?: "big";
  busket?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setBusket?: Dispatch<SetStateAction<any[]>>;
}

const ProductCard: FC<Props> = ({ uiType, busket, setBusket, ...product }) => {
  const { image, title, description } = product;

  return (
    <>
      <div
        className={cn(
          "h-[427px] w-full max-w-[300px] shrink-0 overflow-hidden rounded-[8px]",
          {
            "max-tb:max-w-none h-fit max-w-[389px] cursor-default":
              uiType === "big",
          },
        )}
      >
        <Image
          src={image}
          alt={title}
          width={380}
          height={300}
          className={cn("h-[300px] w-full object-cover object-center", {
            "max-500:h-[186px] max-tb:h-[300px] h-[200px]": uiType === "big",
          })}
        />
        <div
          className={cn("bg-bg-secondary px-[12px] pt-[12px] pb-[5px]", {
            "max-tb:[background-image:_none] bg-[linear-gradient(180deg,#242424_0%,#181818_100%)]":
              uiType === "big",
          })}
        >
          <div
            className={cn("dark-scroll", {
              "max-tb:overflow-hidden max-tb:h-fit h-[168px] overflow-y-auto pr-[12px]":
                uiType === "big",
            })}
          >
            <div className="flex items-center justify-between">
              <Text size={16} element="h3" className="font-bold">
                {title}
              </Text>
            </div>
            <Text
              element="p"
              size={15}
              className={cn("text-disabled-text", {
                "line-clamp-2": uiType !== "big",
              })}
            >
              {description}
            </Text>
            {busket && setBusket && (
              <Button
                onClick={() =>
                  setBusket((prev) => {
                    const alreadyExists = prev.some(
                      (item) => item.id === product.id,
                    );
                    if (alreadyExists) {
                      toast("Товар уже добавлен в корзину");
                      return prev;
                    }
                    toast("Товар добавлен в корзину");
                    return [...prev, product];
                  })
                }
                className="m-[10px_auto] block"
              >
                save
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
