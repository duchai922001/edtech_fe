import axiosInstance from "./main.service";

export const FlashCardService = {
  getFlashCards: async () => {
    const response = await axiosInstance.get("/flashcards/group");
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
