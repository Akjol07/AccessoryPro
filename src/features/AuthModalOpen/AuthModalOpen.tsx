"use client";

import { FC, useState } from "react";
import Auth from "@/features/Auth/ui/Auth";
import Button from "@/shared/ui/Button/Button";
import { cn, logOut } from "@/shared/helpers/helpers";
import { useProfile } from "@/features/Auth/model/useProfile";
import { toast } from "react-toastify";

interface Props {
  className?: string;
  onClick?: () => void;
  isHandleScroll?: boolean;
}

const AuthModalOpen: FC<Props> = ({
  onClick,
  className = "",
  isHandleScroll = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuth, setIsAuth } = useProfile();

  const onClickBtn = () => {
    onClick?.();
    if (isAuth) {
      logOut();
      setIsAuth(false);
      toast("Вы успешно вышли с аккаунта!");
    } else setIsOpen(true);
  };

  return (
    <>
      <Button
        onClick={onClickBtn}
        isLoading={isAuth === null}
        loaderClassName="w-[18px] h-[18px]"
        className={cn("w-80 shrink-0", className)}
      >
        {isAuth ? "Log Out" : "Sign Up"}
      </Button>
      <Auth
        isOpen={isOpen}
        close={() => setIsOpen(false)}
        isHandleScroll={isHandleScroll}
      />
    </>
  );
};

export default AuthModalOpen;
