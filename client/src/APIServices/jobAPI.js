import axios from "axios";

// const baseUrl = process.env.REACT_APP_API_URL;
// console.log(baseUrl)
const baseUrl = 'http://localhost:5000/api/v1/job';

export const createJobAPI = async (jobData) => {
    const response = await axios.post(`${baseUrl}/create-job`, jobData, {
        withCredentials: true
    });

    return response.data;
};

export const getAllJobsAPI = async (filters) => {
    // console.log(filters);
    const response = await axios.get(`${baseUrl}`,
        {
            withCredentials: true,
            params: filters
        },
    );

    return response.data;
};