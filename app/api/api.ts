import axios from "axios";

export const api = axios.create({
  baseURL: "https://taste-of-the-end-b.onrender.com",
  // baseURL: "http://localhost:3001",
  withCredentials: true,
});
