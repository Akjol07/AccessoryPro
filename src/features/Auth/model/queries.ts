import { useMutation } from "@tanstack/react-query";
import {
  IGoogleLoginForm,
  ILoginForm,
  ILoginUserResponse,
  IRegisterForm,
  IRegisterUserResponse,
} from "../type/type";
import { requester } from "@/shared/requester/requester";

export const useRegisterMutation = ({
  onSuccess,
}: {
  onSuccess: (data: IRegisterUserResponse) => void;
}) =>
  useMutation({
    mutationFn: async (data: Omit<IRegisterForm, "passwordCheck">) =>
      (await requester.post<IRegisterUserResponse>("api/auth/register/", data))
        .data,
    onSuccess,
  });

export const useLoginMutation = ({
  onSuccess,
}: {
  onSuccess: (data: ILoginUserResponse) => void;
}) =>
  useMutation({
    mutationFn: async (data: ILoginForm) =>
      (await requester.post<ILoginUserResponse>("api/auth/login/", data)).data,
    onSuccess,
  });

export const useGoogleLoginMutation = ({
  onSuccess,
}: {
  onSuccess: (data: ILoginUserResponse) => void;
}) =>
  useMutation({
    mutationFn: async (data: IGoogleLoginForm) =>
      (
        await requester.post<ILoginUserResponse>(
          "api/v1/users/google/login/",
          data,
        )
      ).data,
    onSuccess,
  });
