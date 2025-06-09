import axios from "axios";

export const UploadSourceService = {
  uploadSource: async (formData: any) => {
    return await axios.post(
      "https://edtech-be.onrender.com/api/pdf/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },
};
