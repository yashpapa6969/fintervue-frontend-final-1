import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://0nsq6xi7ub.execute-api.ap-south-1.amazonaws.com/api/',
    timeout: 60000,
    headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Access-Control-Allow-Origin": "*",
    },
});

export default axiosInstance;