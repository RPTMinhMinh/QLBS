import axiosInstance from "../route/interceptor";

const api = 'http://localhost:8080/api/book';

export const getAllBooks = async (page, size) => {
    const response = axiosInstance.get(`${api}/list`, {
        params: {page, size}
    })
    return (await response).data;
}

export const findByIdBook = async(id) => {
    const response = axiosInstance.get(`${api}/findById/${id}`);
    return (await response).data;
}

export const findByCondition = async (req) => {
    const params = new URLSearchParams(req);
    const response = await axiosInstance.get(`${api}/findByCondition`, { params });
    return response.data;
  };
  


export const findByBookName = async(name) => {
    const response = axiosInstance.get(`${api}/findByBookName`, {
        params:{name}
    });
    return (await response).data;
}

export const bestSellerBooks = async() => {
    const response = axiosInstance.get(`${api}/best-seller`);
    return (await response).data;
}

export const newArrivedBook = async() => {
    const response = axiosInstance.get(`${api}/new-arrived`);
    return (await response).data;
}

export const specialOffers = async(discount) => {
    const response = axiosInstance.get(`${api}/special-offer`, {
        params: {discount}
    })
    return (await response).data;
}

export const findByPriceRange = async(filters, page, size) => {
    const params = {
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        page: page,
        size: size
    }
    const response = axiosInstance.get(`${api}/findByPriceRange`, {
        params: params
    })
    return (await response).data;
}