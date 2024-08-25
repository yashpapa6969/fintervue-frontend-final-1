import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://w4yljc6rwl.execute-api.ap-south-1.amazonaws.com/api/',
    timeout: 60000,
    headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Access-Control-Allow-Origin": "*",
    },
});

export default axiosInstance;