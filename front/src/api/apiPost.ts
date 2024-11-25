import apiClient from "./apiClient";
import { Post, ReqPost } from "../types/Post";


const addPost = async (payload: ReqPost): Promise<any> => {
    try {
      const res = await apiClient.post<Promise<any>>("/api/Post/add", {
        data: payload,
      });
      return res; // `res` is already the response data due to the response interceptor
    } catch (error) {
      console.error("Error fetching user list:", error);
      throw error; // Re-throw the error so it can be handled where the function is called
    }
  };

  const getPostByIdUser = async (idUser: string): Promise<any> => {
    try {
        const res = await apiClient.get<Promise<any>>(`/api/Post/user/${idUser}`);
        return res; // `res` is already the response data due to the response interceptor
      } catch (error) {
        console.error("Error fetching user list:", error);
        throw error; // Re-throw the error so it can be handled where the function is called
      }
  }

  const getPostsPendingByUserId = async (idUser: string): Promise<any> => {
    try {
        const res = await apiClient.get<Promise<any>>(`/api/Post/user/posts-pending`);
        return res; // `res` is already the response data due to the response interceptor
      } catch (error) {
        console.error("Error fetching user list:", error);
        throw error; // Re-throw the error so it can be handled where the function is called
      }
  }

  const getPostsApprovedByUserId = async (): Promise<any> => {
    try {
        const res = await apiClient.get<Promise<any>>(`/api/Post/user/posts-approved`);
        return res; // `res` is already the response data due to the response interceptor
      } catch (error) {
        console.error("Error fetching user list:", error);
        throw error; // Re-throw the error so it can be handled where the function is called
      }
  }

  const getPostsDeclinedByUserId = async (idUser: string): Promise<any> => {
    try {
        const res = await apiClient.get<Promise<any>>(`/api/Post/user/posts-pending`);
        return res; // `res` is already the response data due to the response interceptor
      } catch (error) {
        console.error("Error fetching user list:", error);
        throw error; // Re-throw the error so it can be handled where the function is called
      }
  }

  const getAllPost = async (): Promise<any> => {
    try {
        const res = await apiClient.get<Promise<any>>(`/api/Post/all`);
        return res; // `res` is already the response data due to the response interceptor
      } catch (error) {
        console.error("Error fetching user list:", error);
        throw error; // Re-throw the error so it can be handled where the function is called
      }
    }

    const getAllApprovedPost = async (): Promise<any> => {
    try {
        const res = await apiClient.get<Promise<any>>(`/api/Post/all-approved`);
        return res; // `res` is already the response data due to the response interceptor
      } catch (error) {
        console.error("Error fetching user list:", error);
        throw error; // Re-throw the error so it can be handled where the function is called
      }
  }

  const deletePostId = async (id: string): Promise<any> => {
    try {
      const res = await apiClient.delete<Promise<any>>(`/api/Post/delete/${id}`);
      return res; // `res` is already the response data due to the response interceptor
    } catch (error) {
      console.error("Error fetching user list:", error);
      throw error; // Re-throw the error so it can be handled where the function is called
    }
  };

  const deletePostByUserId = async (id: string): Promise<any> => {
    try {
      const res = await apiClient.delete<Promise<any>>(`/api/Post/delete-post-by-userId/${id}`);
      return res; // `res` is already the response data due to the response interceptor
    } catch (error) {
      console.error("Error fetching user list:", error);
      throw error; // Re-throw the error so it can be handled where the function is called
    }
  };
  
  const updatePost = async (id: string, payload: ReqPost): Promise<any> => {
    try {
      const res = await apiClient.put<Promise<any>>(`/api/Post/update-post/${id}`, {
        data: payload,
      });
      return res; // `res` is already the response data due to the response interceptor
    } catch (error) {
      console.error("Error fetching user list:", error);
      throw error; // Re-throw the error so it can be handled where the function is called
    }
  };

  const updateStatusPost = async ( newStatus: string, postId: string): Promise<any> => {
    try {
      const res = await apiClient.put<Promise<any>>(`/api/Post/update-status`, {
        data: {
          newStatus,
          postId
        },
      });
      return res; // `res` is already the response data due to the response interceptor
    } catch (error) {
      console.error("Error fetching user list:", error);
      throw error; // Re-throw the error so it can be handled where the function is called
    }
  };

  const getAllPendingPost = async(): Promise<any> => {
    try {
      const res = await apiClient.get<Promise<any>>(`/api/Post/all-pending`);
      return res; // `res` is already the response data due to the response interceptor
    } catch (error) {
      console.error("Error fetching user list:", error);
      throw error; // Re-throw the error so it can be handled where the function is called
    }
  }

  const getAllDeclinedPost = async(): Promise<any> => {
    try {
      const res = await apiClient.get<Promise<any>>(`/api/Post/all-declined`);
      return res; // `res` is already the response data due to the response interceptor
    } catch (error) {
      console.error("Error fetching user list:", error);
      throw error; // Re-throw the error so it can be handled where the function is called
    }
  }


  export default {
    addPost,
    getAllPost,
    deletePostId,
    updatePost,
    getPostByIdUser,
    deletePostByUserId,
    getPostsPendingByUserId,
    getPostsApprovedByUserId,
    getPostsDeclinedByUserId,
    getAllApprovedPost,
    updateStatusPost,
    getAllPendingPost,
    getAllDeclinedPost
  }