import axiosInstance from "../route/interceptor";

const api = `http://localhost:8080/api/account`;

export const getBooksByEmail = async(page, size) => {
    const response = axiosInstance.get(`${api}/getBooksByEmail`, {
        params: {page, size}
    })
    return (await response).data;
}

export const addWishlist = async(id) => {
    const response = axiosInstance.post(`${api}/addWishlist/${id}`);
    return (await response).data;
}

export const deleteWishlist = async(id) => {
    const response = axiosInstance.delete(`${api}/deleteWishlist/${id}`);
    return (await response).data;
}

export const changePassword = async(id, req) => {
    const response = axiosInstance.put(`${api}/changePassword/${id}`, req);
    return (await response).data;
}

export const updateAccount = async(id, formData) => {
    console.log(formData.get("fullname"));
    const response = axiosInstance.put(`${api}/update/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return (await response).data;
}

export const checkLoyalCustomer = async() => {
    const response = axiosInstance.get(`${api}/loyal-customer`);
    return (await response).data;
}