import axiosInstance from "./main.service";

export const MocktestChineseService = {
  getMocktests: async () => {
    const response = await axiosInstance.get("/mocktest-chinese/grouped");
    return response;
  },
  getMocktestsByTitle: async (title: string) => {
    const response = await axiosInstance.get("/mocktest-chinese/detail", {
      params: {
        title,
      },
    });
    return response;
  },
};
