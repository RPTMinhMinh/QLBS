import axiosInstance from "../route/interceptor";

const api = `http://localhost:8080/api/cart`;

export const getAllCartByEmail = async(page, size) => {
    const response = axiosInstance.get(`${api}/getCartByEmail`, {
        params: {page, size}
    })
    return (await response).data;
}

export const addCart = async(req) => {
    const response = axiosInstance.post(`${api}/add`, req);
    return (await response).data;
}

export const updateCart = async(id, req) => {
    console.log("Updating cart with id:", id, "and req:", req);
    const response = axiosInstance.put(`${api}/update/${id}`, req);
    console.log("Update cart response:", response.data);
    return (await response).data;
}

export const deleteCart = async(id) => {
    const response = axiosInstance.delete(`${api}/delete/${id}`);
    return (await response).data;
}

export  const deleteCartAfterPayment = async(ids) => {
    const response = axiosInstance.delete(`${api}/deleteCart`, {
        data: ids
    });
    return (await response).data;
}