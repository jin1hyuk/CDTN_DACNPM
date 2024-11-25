import { ReqUser, User } from "../types/User";
import apiClient from "./apiClient";

const signUp = async (payload: ReqUser): Promise<any> => {
    try {
      const res = await apiClient.post<Promise<any>>('/Auth/signup',{data: payload});
      return res; // `res` is already the response data due to the response interceptor
    } catch (error) {
      console.error('Error fetching user list:', error);
      throw error; // Re-throw the error so it can be handled where the function is called
    }
  };

  const signIn = async (email: string, password: string): Promise<any> => {
    try {
      const res = await apiClient.post<Promise<any>>('/Auth/signin',{data: {username:email, password}});
      return res; // `res` is already the response data due to the response interceptor
    } catch (error) {
      console.error('Error fetching user list:', error);
      throw error; // Re-throw the error so it can be handled where the function is called
    }
  };

  const forgotPassword = async (email: string): Promise<any> => {
    try {
      const res = await apiClient.post<Promise<any>>('/Auth/forgot-password',{data: {email}});
      return res; // `res` is already the response data due to the response interceptor
    } catch (error) {
      console.error('Error fetching user list:', error);
      throw error; // Re-throw the error so it can be handled where the function is called
    }
  };
  const resetPassword = async (verificationCode: string,
    email: string,
    newPassword: string): Promise<any> => {
    try {
      const res = await apiClient.post<Promise<any>>('/Auth/reset-password',{data: {verificationCode,
        email,
        newPassword}});
      return res; // `res` is already the response data due to the response interceptor
    } catch (error) {
      console.error('Error fetching user list:', error);
      throw error; // Re-throw the error so it can be handled where the function is called
    }
  };

const getListUser = async (): Promise<any> => {
  try {
    const res = await apiClient.get<Promise<any>>('/api/User');
    return res; // `res` is already the response data due to the response interceptor
  } catch (error) {
    console.error('Error fetching user list:', error);
    throw error; // Re-throw the error so it can be handled where the function is called
  }
};

const getMe = async (): Promise<any> => {
  try {
    const res = await apiClient.get<Promise<any>>('/api/User/token');
    return res; // `res` is already the response data due to the response interceptor
  } catch (error) {
    console.error('Error fetching user list:', error);
    throw error; // Re-throw the error so it can be handled where the function is called
  }
};


const getUserById = async (id: string): Promise<any> =>{
    try {
        const res = await apiClient.get<Promise<any>>(`/api/User/${id}`);
        return res; // `res` is already the response data due to the response interceptor
      } catch (error) {
        console.error('Error fetching user list:', error);
        throw error; // Re-throw the error so it can be handled where the function is called
      }
}

const deleteId = async (id: string): Promise<any> =>{
    try {
        const res = await apiClient.delete<Promise<any>>(`/api/User/${id}`);
        return res; // `res` is already the response data due to the response interceptor
      } catch (error) {
        console.error('Error fetching user list:', error);
        throw error; // Re-throw the error so it can be handled where the function is called
      }
}

const updateUser = async (payload: Partial<User>): Promise<any> =>{
    try {
        const res = await apiClient.put<Promise<any>>(`/api/User/update-user`,{data: payload});
        return res; // `res` is already the response data due to the response interceptor
      } catch (error) {
        console.error('Error fetching user list:', error);
        throw error; // Re-throw the error so it can be handled where the function is called
      }
}

const updateStatus = async (payload: Partial<User>): Promise<any> =>{
    try {
        const res = await apiClient.put<Promise<any>>(`/api/User/update-status`,{data: payload});
        return res; // `res` is already the response data due to the response interceptor
      } catch (error) {
        console.error('Error fetching user list:', error);
        throw error; // Re-throw the error so it can be handled where the function is called
      }
}

export default {
  getListUser,
  getUserById,
  deleteId,
  updateUser,
  signUp,
  signIn,
  forgotPassword,
  resetPassword,
  getMe,
  updateStatus
};
