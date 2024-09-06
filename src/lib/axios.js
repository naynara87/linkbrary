import axios from "axios";

const instance = axios.create({
  baseURL: "https://linkbrary-api.vercel.app/8-8",
  withCredentials: true,
});

export default instance;
