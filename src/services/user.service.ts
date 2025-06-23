import axiosInstance from "./main.service";
import type { AxiosResponse } from "axios";

export interface RegisterPayload {
  fullName: string;
  username: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface VerifyOtpPayload {
  email: string;
  code: string;
}

export const UserService = {
  register: async (payload: RegisterPayload): Promise<AxiosResponse<any>> => {
    const response = await axiosInstance.post(`/users/register`, payload);
    return response;
  },
  login: async (payload: LoginPayload): Promise<AxiosResponse<any>> => {
    const response = await axiosInstance.post(`/users/login`, payload);
    return response;
  },
  getProfile: async (): Promise<AxiosResponse<any>> => {
    const token = localStorage.getItem("token"); // hoặc "jwt" tùy bạn lưu
    const response = await axiosInstance.get(`/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  },
  sendEmailVerify: async (email: string): Promise<AxiosResponse<any>> => {
    const response = await axiosInstance.post(`/users/send-otp-verify-email`, {
      email: email,
    });
    return response;
  },
  verifyOtp: async (payload: VerifyOtpPayload): Promise<AxiosResponse<any>> => {
    const response = await axiosInstance.post(`/users/verify-otp`, payload);
    return response;
  },
};
