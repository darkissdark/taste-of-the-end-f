import axios from "axios";

const appOrigin = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "");
const baseURL = appOrigin ? `${appOrigin}/api` : "/api";

export const api = axios.create({
  baseURL,
  withCredentials: true,
});
