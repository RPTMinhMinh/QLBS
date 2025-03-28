import axiosInstance from '../interceptor/interceptor'
import { Publisher } from '../types/Publisher';

const api = 'http://localhost:8080/api/publisher'

export const getAllPublisher = async(page: number, size: number) => {
    const response = axiosInstance.get(`${api}/list`,{
        params: {page, size},
    })
    return (await response).data;
}

export const deletePublisher = async(id: number) => {
    const response = axiosInstance.delete(`${api}/delete/${id}`);
    return (await response).data
}

export const addPublisher = async(publisher:Publisher) => {
    const response = axiosInstance.post(`${api}/create`, publisher);
    return (await response).data;
}

export const updatePublisher =async (id:number, publisher:Publisher) => {
    const response = axiosInstance.put(`${api}/update/${id}`, publisher);
    return (await response).data;
}

export const findByIdPublisher =async (id:number) => {
    const response = axiosInstance.get(`${api}/findById/${id}`)
    return (await response).data;
}

