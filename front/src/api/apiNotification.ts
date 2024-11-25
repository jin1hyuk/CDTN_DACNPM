import { Comment } from "../types/Comment";
import { Notification } from "../types/Notification";
import apiClient from "./apiClient";

const getNotification = async (userId: string): Promise<any> => {
  try {
    const res = await apiClient.get<Promise<any>>(`/api/Notification/user/${userId}`);
    return res; // `res` is already the response data due to the response interceptor
  } catch (error) {
    console.error("Error fetching user list:", error);
    throw error; // Re-throw the error so it can be handled where the function is called
  }
};

const addNotification = async (userId:string,payload: Notification): Promise<any> => {
  try {
    const res = await apiClient.post<Promise<any>>(`/api/Notification/add`, {
      data: payload,
    });
    return res; // `res` is already the response data due to the response interceptor
  } catch (error) {
    console.error("Error fetching user list:", error);
    throw error; // Re-throw the error so it can be handled where the function is called
  }
};

const updateNotification = async (notificationId: string,payload: Comment): Promise<any> => {
  try {
    const res = await apiClient.put<Promise<any>>(`/api/Notification/update/${notificationId}`, {
      data: payload,
    });
    return res; // `res` is already the response data due to the response interceptor
  } catch (error) {
    console.error("Error fetching user list:", error);
    throw error; // Re-throw the error so it can be handled where the function is called
  }
};

const deleteNotification = async (notificationId:string): Promise<any> => {
  try {
    const res = await apiClient.delete<Promise<any>>(`/api/Notification/delete/${notificationId}`);
    return res; // `res` is already the response data due to the response interceptor
  } catch (error) {
    console.error("Error fetching user list:", error);
    throw error; // Re-throw the error so it can be handled where the function is called
  }
};

export default {
    getNotification,
    addNotification,
    updateNotification,
    deleteNotification
};
