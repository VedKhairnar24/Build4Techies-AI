import axios from "axios";

const api = axios.create({
  baseURL:
    "https://build4techies-ai.onrender.com/api",
});

export default api;
