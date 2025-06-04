import axios from "axios";

export const UploadSourceService = {
  uploadSource: async (formData) => {
    return await axios.post("http://localhost:8080/api/pdf/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
