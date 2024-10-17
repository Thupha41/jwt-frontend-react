import axios from "axios";
import { toast } from "react-toastify";
const instance = axios.create({
  baseURL: "http://localhost:8080",
  //   timeout: 1000,
  //   headers: { "X-Custom-Header": "foobar" },
});
instance.defaults.withCredentials = true;
instance.defaults.headers.common[
  "Authorization"
] = `Bearer ${localStorage.getItem("jwt")}`;
// Add a request interceptor
// instance.interceptors.request.use(
//   function (config) {
//     // Do something before request is sent
//     return config;
//   },
//   function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );
class APIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = "APIError";
    this.statusCode = statusCode;
  }
}
// // Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    return response.data; // Return the data directly for 2xx responses
  },
  function (err) {
    // Resolve rather than reject if the status is within 4xx range for validation errors
    const status = (err && err.response && err.response?.status) || 500;
    console.log(status);
    switch (status) {
      // authentication (token related issues)
      case 401: {
        if (
          window.location.pathname !== "/" &&
          window.location.pathname !== "/login"
        ) {
          toast.error("Unauthorized user!");
        }

        return err.response.data;
      }

      // forbidden (permission related issues)
      case 403: {
        toast.error("You don't have permission to access this resource!");
        return err.response.data;
      }

      // bad request
      case 400: {
        // toast.error("Error! Bad Request");
        return err.response.data;
      }

      // not found
      case 404: {
        toast.error("Error! Not found!");
        return err.response.data;
      }

      // conflict
      case 409: {
        toast.error("Error with Conflict");
        return err.response.data;
      }

      // unprocessable
      case 422: {
        toast.error("Unprocessable!");
        return err.response.data;
      }

      // generic api error (server related) unexpected
      default: {
        return err.response.data;
      }
    }
  }
);

export default instance;
