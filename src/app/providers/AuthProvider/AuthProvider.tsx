"use client";

import { REFRESH_TOKEN } from "@/shared/variables/variables";
import { useProfile } from "@/features/Auth/model/useProfile";
import { getCookie } from "cookies-next";
import { FC, PropsWithChildren, useEffect } from "react";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const { setIsAuth } = useProfile();

  useEffect(() => {
    const refreshToken = getCookie(REFRESH_TOKEN);

    setIsAuth(!!refreshToken);
  }, []);

  return children;
};

export default AuthProvider;
