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

  getMockTests: async (params: {
    page?: number;
    limit?: number;
    languageId?: string;
  }) => {
    const response = await axiosInstance.get("/mocktests/get-all", {
      params,
    });
    return response;
  },

  getMockTestById: async (id: string) => {
    const response = await axiosInstance.get(`/mocktests/${id}`);
    return response;
  },
};
