import React, { createContext, useContext, useState } from 'react';
import axiosInstance from "../route/interceptor.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (req) => {
    const response = await axiosInstance.post('/auth/login', req);
    console.log(response.data);
    setUser(response.data);
    return response.data;
  };

  const decode = async () => {
    const response = await axiosInstance.get("/auth/decode-token");
    return response.data;
  };

  const getUser = async () => {
    const decodedResponse = await axiosInstance.get('/api/account/getUser');
    if (decodedResponse.data.code === 401) {
      alert("Vui lòng đăng nhập!");
    } else {
      setUser(decodedResponse.data);
      return decodedResponse.data;
    }
  };

  const signUp = async (req) => {
    const response = await axiosInstance.post('/auth/signup', req);
    return response.data;
  };

  const verifyOtp = async (req) => {
    const response = await axiosInstance.post('/auth/verify', req);
    return response.data;
  };

  const resend = async (req) => {
    const response = await axiosInstance.post('/auth/resend', req);
    return response.data;
  };

  return (
    <AuthContext.Provider value={{ user, login, decode, getUser, signUp, verifyOtp, resend }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);