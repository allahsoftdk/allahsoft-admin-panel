import axios from "axios";
const baseURL =
    import.meta.env.MODE === "production"
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