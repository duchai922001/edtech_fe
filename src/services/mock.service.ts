import axiosInstance from "./main.service";

export const MocktestService = {
  getAllMocktests: async () => {
    const response = await axiosInstance.get("/mocktests/group");
    return response;
  },

  getMocktestByTitle: async (title: string) => {
    const response = await axiosInstance.get(`/mocktests/title/${title}`);
    return response;
  },
};
