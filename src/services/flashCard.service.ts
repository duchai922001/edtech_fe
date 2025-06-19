import axiosInstance from "./main.service";

export const FlashCardService = {
  getFlashCards: async (params: {
    page?: number;
    limit?: number;
    languageId?: string;
  }) => {
    const response = await axiosInstance.get("/flashcards/?", {
      params: {
        page: params.page,
        limit: 8,
        languageId: params.languageId,
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
    const response = await axiosInstance.post(`/flashcards`, payload);
    return response;
  },

  getFlashcardByUser: async (userId: string) => {
    const response = await axiosInstance.get(`/flashcards/by-user/${userId}`, {
      params: {},
    });
    return response;
  },
};
