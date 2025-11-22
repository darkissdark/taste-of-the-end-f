import axios from 'axios';

let baseURL = '/api';
if (process.env.NEXT_PUBLIC_API_URL) {
  baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';
}

export const api = axios.create({
  baseURL,
  withCredentials: true,
});
