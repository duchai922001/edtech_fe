import axios from "axios";

export const UploadSourceService = {
  uploadSource: async (formData) => {
    await axios.post("http://20.37.113.32:8080/api/files/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
