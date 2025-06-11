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

  getMocktestLanguage: async (languageId: string, page: number = 0) => {
    const response = await axiosInstance.get(
      `/mocktests/language/${languageId}`,
      {
        params: {
          page,
          limit: 5,
        },
      }
    );
    return response;
  },
};
