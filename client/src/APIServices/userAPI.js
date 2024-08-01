import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;

    export const registerAPI = async (userData) => {
    const response = await axios.post(`${baseUrl}/user/register`, {
        email: userData?.email,
        password: userData?.password,
    }, {
        withCredentials: true
    });

    return response.data;
};

export const loginAPI = async (userData) => {
    const response = await axios.post(`${baseUrl}/user/login`, {
        email: userData?.email,
        password: userData?.password,
    }, {
        withCredentials: true
    });

    return response.data;
}

export const logoutAPI = async () => {
    const response = await axios.post(`${baseUrl}/user/logout`, {}, {
        withCredentials: true
    });

    return response.data;
};


export const checkUserAPI = async () => {
    const response = await axios.get(`${baseUrl}/user/check-user`, {
        withCredentials: true
    });

    return response.data;
};