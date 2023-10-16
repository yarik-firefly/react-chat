import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_URI || "http://localhost:4444";

axios.interceptors.request.use((config) => {
  config.headers.authorization = window.localStorage.getItem("token");
  return config;
});

export { axios };
