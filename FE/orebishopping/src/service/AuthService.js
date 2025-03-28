import axiosInstance from "../route/interceptor.js";


async function login(req) {
    const response = await axiosInstance.post('/auth/login', req);
    return response.data;
}

async function decode() {
    const response = await axiosInstance.get("/auth/decode-token");
    return response.data;
}

async function getUser() {
    const decodedResponse = await axiosInstance.get('/api/account/getUser');
    if (decodedResponse.data.code === 401) {
        alert("Vui lòng đăng nhập!")
    } else {
        return decodedResponse.data;
    }
}

async function signUp(req) {
    const response = await axiosInstance.post('/auth/signup', req);
    return response.data;
}
async function verifyOtp(req) {
    // console.log('before: ', req);
    const response = await axiosInstance.post('/auth/verify', req);
    // console.log('after: ', req);
    return response.data;
}

async function resend(req) {
    const response = await axiosInstance.post('/auth/resend', req);
    return response.data;
}

export default { login, decode, getUser, signUp, verifyOtp }







