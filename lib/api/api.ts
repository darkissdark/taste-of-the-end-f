import axios from "axios";

export const nextServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SITE_URL + "/api",
  withCredentials: true,
});
