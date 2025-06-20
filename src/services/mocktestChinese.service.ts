import axiosInstance from "./main.service";

export const MocktestChineseService = {
  getMocktests: async (params: { page?: number; limit?: number }) => {
    const response = await axiosInstance.get("/chinese", {
      params,
    });
    return response;
  },
  getMocktestsByTitle: async (title: string) => {
    const response = await axiosInstance.get("/chinese/detail", {
      params: {
        title,
      },
    });
    return response;
  },
  getMocktestsById: async (id: string) => {
    const response = await axiosInstance.get(`/chinese/${id}`);
    return response;
  },
};
