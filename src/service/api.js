import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;
console.log(API_URL)

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true,
    timeout: 10000
});

export default api;