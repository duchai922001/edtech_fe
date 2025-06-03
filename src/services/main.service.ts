import axios, { AxiosError } from "axios";

const baseURL = import.meta.env.VITE_APP_API_URL;
const timeout = parseInt(import.meta.env.VITE_APP_TIMEOUT || "20000");

const axiosInstance = axios.create({
  baseURL,
  timeout,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post(`${baseURL}/auth/refresh`, {
          refreshToken,
        });

        const newAccessToken = response.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        localStorage.clear();
        alert("Bạn đã hết phiên thao tác vui lòng đăng nhập lại");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    if (error.response?.data) {
      return Promise.reject(error.response.data);
    }

    return Promise.reject({
      message: error.message || "Network error occurred",
      statusCode: error.response?.status || 500,
    });
  }
);

export default axiosInstance;
