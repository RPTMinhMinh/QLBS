import axiosInstance from "../interceptor/interceptor"

const api = 'http://localhost:8080/api/order-detail'

export const getOrderDetail = async (page:number, size: number,orderId:number) => {
    const response = axiosInstance.get(`${api}/getOrderDetail/${orderId}`,{
        params:{page,size}
    });
    return (await response).data;
}