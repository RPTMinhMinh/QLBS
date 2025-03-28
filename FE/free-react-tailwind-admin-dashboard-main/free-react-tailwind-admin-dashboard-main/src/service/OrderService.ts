import axiosInstance from "../interceptor/interceptor"
import { Order } from "../types/Order";

const api = 'http://localhost:8080/api/order'

export const getAll = async(page:number, size:number) => {
    const response = axiosInstance.get(`${api}/list`,{
        params: {page, size},
    })
    return (await response).data;
}

export const deleteOrder = async(id:number) => {
    const response = axiosInstance.delete(`${api}/delete/${id}`);
    return (await response).data;
}

export const updateOrder = async(id:number, order:Order) => {
    const response = axiosInstance.put(`${api}/update/${id}`, order);
    return (await response).data;
}

export const addOrder = async(order:Order) => {
    const response = axiosInstance.post(`${api}/create`, order);
    return (await response).data;
}

export const findByIdOrder = async(id: number) =>{
    const response = axiosInstance.get(`${api}/findById/${id}`);
    return (await response).data;
}

export const getOrderByCondition = async (filter: any, page: number, size: number) => {
    const params = {
        code: filter.code,
        accountName: filter.accountName,
        status: filter.status,
        page: page,
        size: size,
    }
    const response = axiosInstance.get(`${api}/findByCondition`, {
        params: params
    })
    return (await response).data;
}

export const countOrder =async () => {
    const response = axiosInstance.get(`${api}/count-order`);
    return (await response).data;
}

