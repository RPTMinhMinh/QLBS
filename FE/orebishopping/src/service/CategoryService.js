import axiosInstance from "../route/interceptor"

const api = 'http://localhost:8080/api/category'

export const getAllCategories = async () => {
    const response = axiosInstance.get(`${api}/list`);
    return (await response).data;
}

export const findByIdCategory = async(id) => {
    const response = axiosInstance.get(`${api}/findById/${id}`);
    return (await response).data;
}