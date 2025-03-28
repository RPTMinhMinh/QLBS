import axiosInstance from "../interceptor/interceptor"
import { Category } from "../types/Category";

const api = 'http://localhost:8080/api/category'

export const getAllCategory = async(page:number, size:number) => {
    const response = axiosInstance.get(`${api}/list`,{
        params: {page, size},
    })
    return (await response).data;
}

export const deleteCategory = async(id:number) => {
    const response = axiosInstance.delete(`${api}/delete/${id}`);
    return (await response).data;
}

export const updateCategory = async(id:number, category: Category) => {
    const response = axiosInstance.put(`${api}/update/${id}`, category);
    return (await response).data;
}

export const addCategory = async(category: Category) => {
    const response = axiosInstance.post(`${api}/create`,category);
    return (await response).data;
}

export const findByIdCategory = async(id:number) => {
    const response = axiosInstance.get(`${api}/findById/${id}`);
    return (await response).data;
}