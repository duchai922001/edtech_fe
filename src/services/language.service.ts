import axiosInstance from "./main.service";

export const LanguageService = {
  getLanguages: async () => {
    const response = await axiosInstance.get("/languages");
    return response;
  },
};
