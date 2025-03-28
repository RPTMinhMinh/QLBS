import axiosInstance from "../interceptor/interceptor"

const api = 'http://localhost:8080/api/book'

export const getAll = async (page: number, size: number) => {
    const response = axiosInstance.get(`${api}/list`, {
        params: { page, size },
    })
    return (await response).data;
}

export const deleteBook = async (id: number) => {
    const response = axiosInstance.delete(`${api}/delete/${id}`);
    return (await response).data;
}

export const addBook = async (book: FormData) => {
    const response = axiosInstance.post(`${api}/create`, book);
    return (await response).data;
}

export const updateBook = async (id: number, book: FormData) => {
    const response = axiosInstance.put(`${api}/update/${id}`, book);
    return (await response).data;
}

export const findByIdBook = async (id: number) => {
    const response = axiosInstance.get(`${api}/findById/${id}`);
    return (await response).data;
}


export const getBookByCondition = async (page: number, size: number, filter: Record<string, string>) => {
    const params = {
        page,
        size,
        ...Object.fromEntries(
            Object.entries(filter)
                .filter(([_, value]) => value)
                .map(([key, value]) => [key, value])
        ),
    };

    const response = axiosInstance.get(`${api}/findByCondition`, {
        params,
    });

    return (await response).data;
};

export const countBook =async () => {
    const response = axiosInstance.get(`${api}/count-book`);
    return (await response).data;
}