import axios, { InternalAxiosRequestConfig } from "axios";

const Api = axios.create({
  baseURL: "http://dev-api.spotflow.one" + "/api/v1",
});

Api.interceptors.request.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (config: InternalAxiosRequestConfig<any>) => {
    // if (Auth.isAuthenticated() && !config.headers["Authorization"]) {
    //   // additional condition to also check if there is already a Authorization property
    //   config.headers["Authorization"] = `Bearer ${Auth.getToken()}`;
    // }
    return config;
  },
  (error) => Promise.reject(error),
);

Api.interceptors.response.use(
  (response) => {
    if (response.status === 208) {
      throw response;
    }
    return response;
  },
  (error) => Promise.reject(error),
);

export { Api };
