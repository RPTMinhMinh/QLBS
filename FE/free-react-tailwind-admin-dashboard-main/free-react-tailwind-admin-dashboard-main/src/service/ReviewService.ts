import axiosInstance from "../interceptor/interceptor"
import { Review } from "../types/Review";

const api = 'http://localhost:8080/api/review'

export const getAll = async(page:number, size:number) => {
    const response = axiosInstance.get(`${api}/list`,{
        params: {page, size},
    })
    return (await response).data;
}

export const deleteReview = async(id:number) => {
    const response = axiosInstance.delete(`${api}/delete/${id}`);
    return (await response).data;
}

export const updateReview =async (id:number, review:Review) => {
    const response = axiosInstance.put(`${api}/update/${id}`, review);
    return (await response).data;
}

export const addReview =async (review:Review) => {
    const response = axiosInstance.post(`${api}/create`, review);
    return (await response).data;
}

export const findByIdReview =async (id:number) => {
    const response = axiosInstance.get(`${api}/findById/${id}`);
    return (await response).data;
}

export const getReviewByBook =async (id:number, page:number, size:number) => {
    const response = axiosInstance.get(`${api}/getReviewByBook/${id}`,{
        params: {page, size}
    })
    return (await response).data;
}

export const countReview =async () => {
    const response = axiosInstance.get(`${api}/count-review`)
    return (await response).data;
}