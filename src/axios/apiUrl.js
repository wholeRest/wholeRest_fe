import axios from "axios";

export const authHttp = axios.create({
    baseURL: "https://api.wholerest.site",
    timeout: 7000,
})

authHttp.interceptors.request.use(
    config => {
        const accessToken = sessionStorage.getItem('access');

        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    error => Promise.reject(error),
);


