import axios from "axios";

export const API_URL = "http://localhost:5000";

const axiosClient = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Auto error logging
axiosClient.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("❌ API Error:", err.response?.data || err.message);
    return Promise.reject(err);
  }
);

export default axiosClient;
