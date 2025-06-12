import axiosInstance from "./main.service";

export const ResourceService = {
  createResource: async (data: any) => {
    const response = await axiosInstance.post("/resources", data);
    return response;
  },
  getResources: async (languageId?: string) => {
    const response = await axiosInstance.get("/resources", {
      params: {
        languageId,
      },
    });
    return response;
  },
};
