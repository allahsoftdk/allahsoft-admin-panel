import axios from "axios";
const baseURL =
    process.env.NODE_ENV === "production"
        ? "https://admin.allahsoft.dk"
        : "http://localhost";
export const axiosInstance = axios.create({
    baseURL,
    timeout: 10000,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});