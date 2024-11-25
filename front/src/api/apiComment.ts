import { Comment } from "../types/Comment";
import apiClient from "./apiClient";

const getComment = async (postId: string): Promise<any> => {
  try {
    const res = await apiClient.get<Promise<any>>(`/api/Comment/${postId}`);
    return res; // `res` is already the response data due to the response interceptor
  } catch (error) {
    console.error("Error fetching user list:", error);
    throw error; // Re-throw the error so it can be handled where the function is called
  }
};

const addComment = async (payload: Comment): Promise<any> => {
  try {
    const res = await apiClient.post<Promise<any>>(`/api/Comment`, {
      data: payload,
    });
    return res; // `res` is already the response data due to the response interceptor
  } catch (error) {
    console.error("Error fetching user list:", error);
    throw error; // Re-throw the error so it can be handled where the function is called
  }
};

const UpdateComment = async (commentId: string,payload: Comment): Promise<any> => {
  try {
    const res = await apiClient.put<Promise<any>>(`/api/Comment/${commentId}`, {
      data: payload,
    });
    return res; // `res` is already the response data due to the response interceptor
  } catch (error) {
    console.error("Error fetching user list:", error);
    throw error; // Re-throw the error so it can be handled where the function is called
  }
};

const deleteComment = async (idComment:string): Promise<any> => {
  try {
    const res = await apiClient.delete<Promise<any>>(`/api/Comment/${idComment}`);
    return res; // `res` is already the response data due to the response interceptor
  } catch (error) {
    console.error("Error fetching user list:", error);
    throw error; // Re-throw the error so it can be handled where the function is called
  }
};

export default {
    getComment,
    addComment,
    UpdateComment,
    deleteComment
};
