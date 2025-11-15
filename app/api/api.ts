import axios from "axios";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "https://taste-of-the-end-b.onrender.com";

export const api = axios.create({
  baseURL: BACKEND_URL,
  // baseURL: "http://localhost:3001",
  withCredentials: true,
});
