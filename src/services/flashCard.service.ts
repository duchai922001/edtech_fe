import axiosInstance from "./main.service";

export const FlashCardService = {
  getFlashCards: async (params: {
    languageId?: string;
    purpose?: string;
    page?: number;
    size?: number;
    search?: string;
  }) => {
    const response = await axiosInstance.get("/flashcards/group", {
      params: {
        languageId: params.languageId,
        purpose: params.purpose,
        page: params.page,
        size: params.size ?? 10,
        search: params.search,
      },
    });
    return response;
  },
  getFlashCardByTitle: async (title: string) => {
    const response = await axiosInstance.get(`/flashcards/subject`, {
      params: {
        title,
      },
    });
    return response;
  },
  createFlashCards: async (payload: any) => {
    const response = await axiosInstance.post(`/flashcards/bulk`, payload);
    return response;
  },
};
