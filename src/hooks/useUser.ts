import { useMutation } from "@tanstack/react-query";
import { UserService } from "../services/user.service";
import type { LoginPayload, RegisterPayload } from "../services/user.service";
import { AxiosError } from "axios";
import type { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

export const useRegister = () => {
  return useMutation<AxiosResponse<any>, AxiosError, RegisterPayload>({
    mutationFn: (payload) => UserService.register(payload),
    onSuccess: (response) => {
      toast.success("Register Success");
      console.log("Register response:", response.data);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Sign Up failed");
    },
  });
};

export const useLogin = () => {
  return useMutation<AxiosResponse<any>, AxiosError, LoginPayload>({
    mutationFn: (payload) => UserService.login(payload),
    onSuccess: () => {
      toast.success("Login Success");
      // const token = response.data.token;
      // localStorage.setItem("token", token);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Login failed");
    },
  });
};

export const useUserProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: () => UserService.getProfile(),
    select: (res) => res.data,
  });
};

export const useSendEmailVerify = () => {
  return useMutation({
    mutationFn: (email: string) => UserService.sendEmailVerify(email),
    onSuccess: () => {
      console.log("Send otp Success");
    },
  });
};

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: (payload: any) => UserService.verifyOtp(payload),
    onSuccess: () => {
      console.log("Verify Success");
    },
  });
};
