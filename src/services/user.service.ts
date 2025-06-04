import axiosInstance from "./main.service";

export const UserService = {
  register: async (payload: any) => {
    const response = await axiosInstance.post(`/users`, payload);
    return response;
  },
};
