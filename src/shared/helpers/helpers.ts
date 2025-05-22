import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { setCookie, deleteCookie } from "cookies-next";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../variables/variables";
import { useProfile } from "@/features/Auth/model/useProfile";

export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(args));
};

export const saveTokens = (access: string, refresh?: string) => {
  localStorage.setItem(ACCESS_TOKEN, access);
  if (refresh) setCookie(REFRESH_TOKEN, refresh);
};

export const logOut = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  deleteCookie(REFRESH_TOKEN);
  useProfile.getState().setIsAuth(false);
};

export const trimObjectValues = <T extends object>(obj: T) =>
  Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key,
      typeof value === "string" ? value.trim() : value,
    ]),
  ) as T;
