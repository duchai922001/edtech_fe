import axiosInstance from "./main.service";

export const ResourceService = {
  createResource: async (data: any) => {
    const response = await axiosInstance.post("/resources", data);
    return response;
  },
  getResources: async (params: {
    page?: number;
    limit?: number;
    languageId?: string;
  }) => {
    const response = await axiosInstance.get("/resources", {
      params,
    });
    return response;
  },
};
