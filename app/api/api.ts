import axios from "axios";

const backendBase =
  process.env.API_BASE_URL?.replace(/\/$/, "") ??
  "https://taste-of-the-end-b.onrender.com";

export const api = axios.create({
  baseURL: `${backendBase}/api`,
  withCredentials: true,
});
