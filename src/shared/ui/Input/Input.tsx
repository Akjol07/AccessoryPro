import {
  InputHTMLAttributes,
  MutableRefObject,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";

import { FieldError } from "react-hook-form";
import Text from "../Text/Text";
import { cn } from "@/shared/helpers/helpers";
import eyeIcon from "@/shared/assets/images/icons/eye.svg";
import closedEyeIcon from "@/shared/assets/images/icons/eye-closed.svg";
import Image from "next/image";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError;
  wrapperClassName?: string;
  setValue?: (value: string) => void;
}

const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      error: errorData,
      type,
      placeholder,
      className,
      value,
      wrapperClassName,
      onChange,
      ...register
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [localType, setLocalType] = useState(type);
    const [height, setHeight] = useState(0);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const isPlaceholderTransform = isFocused || value;

    useEffect(() => {
      if (inputRef.current) setHeight(inputRef.current?.scrollHeight);
    }, [inputRef]);

    const togglePasswordHidden = () => {
      setLocalType((prev) => (prev === "password" ? "text" : "password"));
    };

    const error = errorData?.message || errorData?.type;

    return (
      <div className={cn("relative", wrapperClassName)}>
        <Text
          style={{
            ...(isPlaceholderTransform
              ? {
                  transform: `translateX(-16px) translateY(-${height}px)`,
                  scale: "0.8",
                }
              : {}),
          }}
          className={cn(
            "text-gray-2 animate-def pointer-events-none absolute top-[50%] left-[16px] z-10 origin-left translate-y-[-50%] duration-[.35s]",
            {
              "text-white": isPlaceholderTransform,
              "text-red": error,
              "": !isPlaceholderTransform,
            },
          )}
        >
          {placeholder}
        </Text>
        <Text className="text-red absolute top-[-18px] right-0 text-[10.3px]">
          {error}
        </Text>
        <input
          ref={(node) => {
            inputRef.current = node;
            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              (ref as MutableRefObject<HTMLInputElement | null>).current = node;
            }
          }}
          type={localType}
          onChange={onChange}
          className={cn(
            "bg-gray no-autofill border-gray animate-def top-[50%] w-full rounded-[8px] border-2 px-[16px] py-10 text-[13px] outline-none",
            className,
            { "border-white": isFocused, "text-red border-red": error },
          )}
          {...register}
          onFocus={(e) => {
            register.onFocus?.(e);
            setIsFocused(true);
          }}
          onBlur={(e) => {
            register.onBlur?.(e);
            setIsFocused(false);
          }}
        />
        {type === "password" && (
          <button
            onClick={togglePasswordHidden}
            className="animate-def absolute top-[50%] right-[16px] translate-y-[-50%]"
          >
            <Image
              src={
                localType === "text" && type === "password"
                  ? closedEyeIcon
                  : eyeIcon
              }
              alt="eye"
            />
          </button>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
