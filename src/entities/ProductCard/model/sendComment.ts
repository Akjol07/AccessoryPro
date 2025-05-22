import { requester } from "@/shared/requester/requester";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { ICommentForm } from "../type/type";

export const useSendCommentMutation = ({
  onSuccess,
}: {
  onSuccess: () => void;
}) =>
  useMutation({
    mutationFn: async (data: ICommentForm) =>
      await requester.post("/api/v1/reviews/barber/", data),
    onSuccess: () => {
      toast("Your comment successfully sent!");
      onSuccess();
    },
  });
