import axiosInstance from "../route/interceptor"

const api = 'http://localhost:8080/api/review'

export const getReviewByBookId = async (bookId) => {
    const response = axiosInstance.get(`${api}/getReviewByBook/${bookId}`);
    return (await response).data;
}

export const checkReview = async(bookId) => {
    const response = axiosInstance.get(`${api}/checkReview/${bookId}`);
    return (await response).data;
}

export const deleteReview = async(id) => {
    const response = axiosInstance.delete(`${api}/delete/${id}`);
    return (await response).data;
}

export const createReview = async(req) => {
    const response = axiosInstance.post(`${api}/create`, req);
    return (await response).data;
}

export const updateReview = async(req, id) => {
    const response = axiosInstance.put(`${api}/update/${id}`, req);
    return (await response).data;
}

export const checkHasReview = async(bookId) => {
    const response = axiosInstance.get(`${api}/checkHasReview/${bookId}`);
    return (await response).data;
}