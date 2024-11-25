import { Like } from "../types/Like";
import apiClient from "./apiClient";

const getTrueLike = async (postId: string): Promise<any> => {
  try {
    const res = await apiClient.get<Promise<any>>(`/api/Like/TrueLikes`);
    return res; // `res` is already the response data due to the response interceptor
  } catch (error) {
    console.error("Error fetching user list:", error);
    throw error; // Re-throw the error so it can be handled where the function is called
  }
};

const getFalseLike = async (postId: string): Promise<any> => {
  try {
    const res = await apiClient.get<Promise<any>>(`/api/Like/TrueLikes`);
    return res; // `res` is already the response data due to the response interceptor
  } catch (error) {
    console.error("Error fetching user list:", error);
    throw error; // Re-throw the error so it can be handled where the function is called
  }
};

const addLike = async (payload: Like): Promise<any> => {
  try {
    const res = await apiClient.post<Promise<any>>(`/api/Like/add`, {
      data: payload,
    });
    return res; // `res` is already the response data due to the response interceptor
  } catch (error) {
    console.error("Error fetching user list:", error);
    throw error; // Re-throw the error so it can be handled where the function is called
  }
};

const updateLike = async (payload: Like): Promise<any> => {
  try {
    const res = await apiClient.put<Promise<any>>(`/api/Like/update`, {
      data: payload,
    });
    return res; // `res` is already the response data due to the response interceptor
  } catch (error) {
    console.error("Error fetching user list:", error);
    throw error; // Re-throw the error so it can be handled where the function is called
  }
};

const deleteLike = async (payload: Like): Promise<any> => {
  try {
    const res = await apiClient.delete<Promise<any>>(`/api/Like/update`, {
      data: payload,
    });
    return res; // `res` is already the response data due to the response interceptor
  } catch (error) {
    console.error("Error fetching user list:", error);
    throw error; // Re-throw the error so it can be handled where the function is called
  }
};

export default {
  getTrueLike,
  getFalseLike,
  addLike,
  updateLike,
  deleteLike,
};
