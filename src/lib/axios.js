import axios from "axios";

const instance = axios.create({
  baseURL: "https://linkbrary-api.vercel.app/8-8",
});
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
