import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3737/api",
  headers: {
    "Content-Type": "application/json",
    timeout: 10000,
  },
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("Interceptor Error Response:", error.response);
      // Handle specific status codes globally
      switch (error.response.status) {
        case 400:
          console.error("Bad Request:", error.response.data);
          break;
        case 401:
          console.error("Unauthorized access");
          break;
        case 403:
          console.error("Access forbidden");
          break;
        case 404:
          console.error("Resource not found");
          break;
        default:
          console.error("Unhandled error:", error.response.status);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
