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
};
