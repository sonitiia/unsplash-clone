import axios from "axios";

const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export const httpClient = axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization: `Client-ID ${accessKey ?? ""}`,
    "Accept-Version": "v1",
  },
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.errors?.[0] ??
      error.response?.statusText ??
      error.message;

    return Promise.reject(new Error(String(message)));
  },
);

export function hasUnsplashKey(): boolean {
  return Boolean(accessKey && accessKey !== "your_access_key_here");
}
