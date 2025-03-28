import axiosInstance from '../interceptor/interceptor'
import { Role } from '../types/Role';

const api = 'http://localhost:8080/api/role'

export const getAllRole = async(page: number, size: number) => {
    const response = axiosInstance.get(`${api}/list`,{
        params: {page, size},
    })
    return (await response).data;
}

export const deleteRole = async(id: number) => {
    const response = axiosInstance.delete(`${api}/delete/${id}`);
    return (await response).data
}

export const updateRole = async(id:number,role:Role) => {
    const response = axiosInstance.put(`${api}/update/${id}`,role);
    return (await response).data;
}

export const addRole = async(role:Role) => {
    const response = axiosInstance.post(`${api}/create`, role);
    return (await response).data;
}

export const findByIdRole = async(id:number) => {
    const response =  axiosInstance.get(`${api}/findById/${id}`);
    return (await response).data;
}