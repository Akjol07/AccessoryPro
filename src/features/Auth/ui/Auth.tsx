import { FC, useEffect, useState } from "react";
import { IRegisterForm } from "../type/type";
import Input from "@/shared/ui/Input/Input";
import Modal from "@/shared/ui/Modal/Modal";
import Navigation from "@/shared/ui/Navigation/Navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "@/shared/ui/Button/Button";
import { cn, saveTokens, trimObjectValues } from "@/shared/helpers/helpers";
import {
  emailValidation,
  fullnameValidation,
  passwordCheckValidation,
  passwordValidation,
} from "@/shared/helpers/validate";
import { toast } from "react-toastify";
import { useProfile } from "../model/useProfile";
import { useLoginMutation, useRegisterMutation } from "../model/queries";

interface Props {
  isOpen: boolean;
  close: () => void;
  isHandleScroll?: boolean;
}

type NavigationType = "Sign Up" | "Sign In";

const navigationList: NavigationType[] = ["Sign Up", "Sign In"];

const Auth: FC<Props> = ({ isOpen, close, isHandleScroll = true }) => {
  const {
    watch,
    reset,
    handleSubmit,
    register: registerInp,
    formState: { errors },
  } = useForm<IRegisterForm>();
  const [page, setPage] = useState<NavigationType>("Sign Up");
  const { setIsAuth } = useProfile();

  const { mutate: register, isPending } = useRegisterMutation({
    onSuccess: (data) => {
      close();
      setIsAuth(true);
      saveTokens(data.token.accessToken, data.token.refreshToken);
      toast("Вы успешно зарегистрировались!");
    },
  });

  const { mutate: login, isPending: isLoginPending } = useLoginMutation({
    onSuccess: (data) => {
      close();
      setIsAuth(true);
      saveTokens(data.token.accessToken, data.token.refreshToken);
      toast("Вы успешно вошли!");
    },
  });

  useEffect(() => {
    if (!isOpen) reset();
  }, [isOpen]);

  useEffect(() => {
    reset();
  }, [page]);

  const auth: SubmitHandler<IRegisterForm> = (data) => {
    const formattedData = trimObjectValues(data);

    if (page === "Sign Up") register(formattedData);
    else login(formattedData);
  };

  const getPage = (page: NavigationType) => {
    switch (page) {
      case "Sign Up":
        return (
          <>
            <Input
              key="username"
              autoComplete="off"
              value={watch("username")}
              placeholder="User Name"
              error={errors.username}
              {...registerInp("username", fullnameValidation)}
            />
            <Input
              key="email-sign-up"
              autoComplete="off"
              error={errors.email}
              value={watch("email")}
              placeholder="Email"
              {...registerInp("email", emailValidation)}
            />
            <Input
              type="password"
              value={watch("password")}
              placeholder="Password"
              error={errors.password}
              {...registerInp("password", passwordValidation)}
            />
            <Input
              type="password"
              value={watch("passwordCheck")}
              placeholder="Password Check"
              error={errors.passwordCheck}
              {...registerInp(
                "passwordCheck",
                passwordCheckValidation(watch("password")),
              )}
            />
          </>
        );

      case "Sign In":
        return (
          <>
            <Input
              key="email"
              autoComplete="off"
              error={errors.email}
              value={watch("email")}
              placeholder="Email"
              {...registerInp("email", emailValidation)}
            />
            <Input
              key="password"
              type="password"
              placeholder="Password"
              value={watch("password")}
              error={errors.password}
              {...registerInp("password", passwordValidation)}
            />
          </>
        );
    }
  };

  return (
    <>
      <Modal
        closable
        close={close}
        isOpen={isOpen}
        isAttachedDown={false}
        isHandleScroll={isHandleScroll}
        className={cn("flex h-[582px] max-w-[397px] flex-col gap-[32px]")}
      >
        <>
          <Navigation<NavigationType>
            className="pt-[48px]"
            page={page}
            list={navigationList}
            setPage={(page) => setPage(page)}
          />
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex grow flex-col justify-between gap-[32px]"
          >
            <div className="flex flex-col gap-[24px]">{getPage(page)}</div>
            <div className="flex grow flex-col justify-end">
              <Button
                onClick={handleSubmit(auth)}
                isLoading={isPending || isLoginPending}
                className="h-[43px] w-full py-[12px] text-[16px] leading-[19px]"
              >
                Sign {page === "Sign In" ? "In" : "Up"}
              </Button>
            </div>
          </form>
        </>
      </Modal>
    </>
  );
};

export default Auth;
