import axiosInstance from "../route/interceptor"

const apiOrder = 'http://localhost:8080/api/order'
const apiOrderDetail = 'http://localhost:8080/api/order-detail'

export const addOrder = async(req) => {
    const response = axiosInstance.post(`${apiOrder}/create`, req);
    return (await response).data
}

export const addOrderDetail = async(req) => {
    const response = axiosInstance.post(`${apiOrderDetail}`, req);
    return (await response).data;
}

export const getOrderByEmail = async(page, size) => {
    const response = axiosInstance.get(`${apiOrder}/findOrderByEmail`, {
        params: {page, size}
    })
    return (await response).data;
}

export const getOrderDetail = async(orderId) => {
    const response = axiosInstance.get(`${apiOrderDetail}/getOrderDetail/${orderId}`);
    return (await response).data;
}