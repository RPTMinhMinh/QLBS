import axiosInstance from "../interceptor/interceptor"
import { ChangePassword } from "../types/ChangePassword";

const api = 'http://localhost:8080/api/account'

export const getAll = async (page: number, size: number) => {
    const response = axiosInstance.get(`${api}/list`, {
        params: { page, size },
    })
    return (await response).data;
}

export const deleteAccount = async (id: number) => {
    const response = axiosInstance.delete(`${api}/delete/${id}`);
    return (await response).data;
}

export const updateAccount = async (id: number, account: FormData) => {
    const response = axiosInstance.put(`${api}/update/${id}`, account);
    return (await response).data;
}

export const findByIdAccount = async (id: number) => {
    const response = axiosInstance.get(`${api}/findById/${id}`);
    return (await response).data
}

export const changePassword = async (id: number, changePassword: ChangePassword) => {
    const response = axiosInstance.put(`${api}/changePassword/${id}`, changePassword);
    return (await response).data;
}

export const getBookByEmail = async (page: number, size: number) => {
    const response = axiosInstance.get(`${api}/getBooksByEmail`, {
        params: { page, size },
    })
    return (await response).data
}

export const addWishList = async (id: number) => {
    const response = axiosInstance.post(`${api}/addWishlist/${id}`);
    return (await response).data;
}

export const deleteWishList = async (id: number) => {
    const response = axiosInstance.delete(`${api}/deleteWishlist/${id}`);
    return (await response).data;
}

export const getUser = async () => {
    const response = axiosInstance.get(`${api}/getUser`);
    return (await response).data;
}

export const getAccountByCondition = async (filter: any, page: number, size: number) => {
    const params = {
        email: filter.email,
        phone: filter.phone,
        roleName: filter.roleName,
        page: page,
        size: size,
    }
    const response = axiosInstance.get(`${api}/findByCondition`, {
        params: params
    })
    return (await response).data;
}

export const countAccount = async() => {
    const response = axiosInstance.get(`${api}/count-account`);
    return (await response).data;
}