// api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.6.63:8000",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token && config.url && !config.url.includes("/signin")) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
