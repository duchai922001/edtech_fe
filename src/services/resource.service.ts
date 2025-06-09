import axiosInstance from "./main.service";

export const ResourceService = {
  createResource: async (data: any) => {
    const response = await axiosInstance.post("/resources", data);
    return response;
  },
  getResources: async () => {
    const response = await axiosInstance.get("/resources");
    return response;
  },
};
