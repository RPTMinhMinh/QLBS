import axiosInstance from "../interceptor/interceptor";

const api = 'http://localhost:8080/api/revenue';

export const getCategoryRevenue = async() => {
    const response = axiosInstance.get(`${api}/list`);
    return (await response).data;
}

export const revenueByWeek = async() => {
    const response = axiosInstance.get(`${api}/revenue-by-week`);
    return (await response).data;
}

export const revenueByMonth = async() => {
    const response = axiosInstance.get(`${api}/revenue-by-month`);
    return (await response).data;
}

export const revenueByYear = async() => {
    const response = axiosInstance.get(`${api}/revenue-by-year`);
    return (await response).data;
}

export const exportExcel = async () => {
    const response = await axiosInstance.get(`${api}/exportExcel`, { responseType: 'blob' });
    return response;
};

export const exportExcelByMonth = async () => {
    const response = await axiosInstance.get(`${api}/exportExcelByMonth`, { responseType: 'blob' });
    return response;
};

export const exportExcelByYear = async () => {
    const response = await axiosInstance.get(`${api}/exportExcelByYear`, { responseType: 'blob' });
    return response;
};

export const exportExcelByWeek = async () => {
    const response = await axiosInstance.get(`${api}/exportExcelByWeek`, { responseType: 'blob' });
    return response;
};
