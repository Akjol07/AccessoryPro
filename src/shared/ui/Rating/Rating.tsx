"use client";

import { RatingType } from "@/shared/types/types";
import Image from "next/image";
import { FC, useEffect, useRef, useState } from "react";
import starFullIcon from "@/shared/assets/images/icons/star-full.svg";
import starEmptyIcon from "@/shared/assets/images/icons/star-empty.svg";
import starHalfIcon from "@/shared/assets/images/icons/star-half.svg";
import Text from "../Text/Text";
import { cn } from "@/shared/helpers/helpers";

interface IChangeable {
  setValue: (newValue: RatingType) => void;
}

interface Props {
  rating: number;
  isNumberVisible?: boolean;
  className?: string;
  changeable?: IChangeable;
}

const Rating: FC<Props> = ({
  rating,
  isNumberVisible,
  className = "",
  changeable,
}) => {
  const [hoveringValue, setHoveringValue] = useState(rating);

  useEffect(() => {
    setHoveringValue(rating);
  }, [rating]);

  return (
    <div className={cn("flex items-center gap-[6px]", className)}>
      {isNumberVisible && (
        <Text className="text-disabled-text mt-[2px]">{rating}</Text>
      )}
      <div
        onMouseLeave={() => setHoveringValue(rating)}
        className="flex gap-[4.6px]"
      >
        {Array.from({ length: 5 }, (_, key) => (
          <Star
            key={key}
            id={key + 1}
            rating={rating}
            changeable={!!changeable}
            hoveringValue={hoveringValue}
            setHoveringValue={(newValue) => setHoveringValue(newValue)}
            setRating={changeable?.setValue}
          />
        ))}
      </div>
    </div>
  );
};

export default Rating;

function Star({
  id,
  rating,
  changeable,
  hoveringValue,
  setHoveringValue,
  setRating,
}: {
  id: number;
  rating: number;
  changeable: boolean;
  hoveringValue: number;
  setHoveringValue: (value: RatingType) => void;
  setRating?: (value: RatingType) => void;
}) {
  const starRef = useRef<HTMLImageElement>(null);
  const [isHoveringActive, setIsHoveringActive] = useState(true);

  const handleMouseMove = () => {
    if (!starRef.current || !changeable || !isHoveringActive) return;

    setHoveringValue(id as RatingType);
  };

  const onClickStar = () => {
    if (!changeable) return;

    const newValue = id;

    setIsHoveringActive(false);
    setRating!((rating === newValue ? 0 : newValue) as RatingType);
  };

  return (
    <Image
      ref={starRef}
      key={id <= Math.floor(hoveringValue) ? "full" : "empty"}
      onClick={onClickStar}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => !isHoveringActive && setIsHoveringActive(true)}
      src={
        !Number.isInteger(hoveringValue) && Math.ceil(hoveringValue) === id
          ? starHalfIcon
          : id <= Math.floor(hoveringValue)
            ? starFullIcon
            : starEmptyIcon
      }
      alt={`star-${id <= Math.floor(hoveringValue) ? "full" : "empty"}`}
      className={cn("animate-def h-[11px] w-[11px]", {
        "cursor-pointer hover:scale-110": changeable,
      })}
    />
  );
}
