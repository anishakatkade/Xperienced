import axios from "axios";

const API = axios.create({
baseURL:

"https://xperienced.onrender.com/api",



});
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  console.log("INTERCEPTOR TOKEN:", token);
  console.log("REQUEST:", req.url);

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;
