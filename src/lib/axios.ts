import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

//cada vez que se use api, que incluya el token
api.interceptors.request.use( config => {
    const token = localStorage.getItem("AUTH_TOKEN");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

export default api;