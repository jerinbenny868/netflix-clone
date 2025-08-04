import axios from "axios";

// Optional debug log
console.log("API URL:", import.meta.env.VITE_API_URL);

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // if using cookies
});

export default API;
