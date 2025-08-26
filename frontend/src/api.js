// axios default setup
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",  // 👈 backend ka URL
});

export default api;
