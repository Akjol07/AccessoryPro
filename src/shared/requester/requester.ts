import axios from "axios";
import { getCookie } from "cookies-next";
import { ACCESS_TOKEN, BASE_URL, REFRESH_TOKEN } from "../variables/variables";
import { logOut, saveTokens } from "../helpers/helpers";

export const requester = axios.create({
  baseURL: "https://pokemon.465275.xyz/",
});

requester.interceptors.request.use((config) => {
  const token = localStorage.getItem(ACCESS_TOKEN);

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

requester.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const onRequest = error.config;

    if (error.response?.status === 401) {
      if (error.config && !error.config._isRetry) {
        try {
          const refresh = getCookie(REFRESH_TOKEN);
          if (!refresh) {
            logOut();
            throw error;
          }

          const isSuccessRefresh = (
            await axios.post<{
              accessToken: string;
            }>(`${BASE_URL}api/auth/refresh/`, {
              refreshToken: getCookie(REFRESH_TOKEN),
            })
          ).data;

          saveTokens(isSuccessRefresh?.accessToken);

          if (!isSuccessRefresh) {
            return logOut();
          }
          return requester.request(onRequest);
        } catch {
          logOut();
          throw error;
        }
      } else if (
        error.response?.data?.code === "user_not_found" ||
        error.response?.data?.code === "user_inactive"
      ) {
        logOut();
        throw error;
      }
    }

    if (error.response?.status >= 400 && error.response?.status < 500)
      throw error;

    console.dir(error, "axios requester error");
  },
);
