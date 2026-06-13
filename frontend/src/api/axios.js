import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-resume-interview-production.up.railway.app/",
});

// Access token automatically attach
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Refresh token logic
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refresh = localStorage.getItem("refresh");

      const res = await axios.post(
        "http://localhost:8000/api/users/token/refresh/",
        {
          refresh,
        }
      );

      localStorage.setItem(
        "access",
        res.data.access
      );

      originalRequest.headers.Authorization =
        `Bearer ${res.data.access}`;

      return API(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default API;
