
import axiosInstance from "../route/interceptor";

const api = 'http://localhost:8080/api/payment';

//VNPAY
async function createVNPay(amount,bankCode) {
    try {
        const response = await axiosInstance.get(`${api}/vn-pay`, {
            params: { amount,bankCode }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
async function handleVNPayReturn(query) {
    const response = await axiosInstance.get(`/api/payment/vnpay_return`, { params: query });
    return response.data;
}


//MOMO
async function momoPayment(req) {
    const response = await axiosInstance.post(`${api}`, req);
    return response.data;
}

async function checkPaymentStatus(req) {
    const response = await axiosInstance.get(`${api}/order-status/${req}`);
    return response.data;
}

//ZALOPAY

async function createZaloPay(req) {
    const response = await axiosInstance.post(`${api}/create-zalopay`, req);
    return response.data;
}

async function getOrderStatus(req) {
    const response = await axiosInstance.get(`${api}/order-status-zalopay/${req}`);
    return response.data;
}

export default { createVNPay, handleVNPayReturn, momoPayment, checkPaymentStatus, createZaloPay, getOrderStatus };