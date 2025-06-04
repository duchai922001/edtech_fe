import { useMutation } from "@tanstack/react-query";
import { UserService } from "../services/user.service";
import toast from "react-hot-toast";

export const useRegister = () => {
  return useMutation({
    mutationFn: (payload: any) => UserService.register(payload),
    onSuccess: () => {
      toast.success("Register Success");
    },
  });
};
