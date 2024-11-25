import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Hàm lưu trữ dữ liệu vào localStorage
export function setToLocalStorage(key: string, value: any) {
  try {
      const jsonValue = JSON.stringify(value); // Chuyển đổi value thành chuỗi JSON
      localStorage.setItem(key, jsonValue); // Lưu chuỗi vào localStorage
      console.log(`Đã lưu dữ liệu vào localStorage với key: "${key}"`);
  } catch (error) {
      console.error("Lỗi khi lưu dữ liệu vào localStorage:", error);
  }
}

// Hàm lấy dữ liệu từ localStorage
export function getFromLocalStorage(key: string) {
  try {
      const jsonValue = localStorage.getItem(key); // Lấy chuỗi JSON từ localStorage
      return jsonValue ? JSON.parse(jsonValue) : null; // Chuyển chuỗi JSON thành dữ liệu ban đầu
  } catch (error) {
      console.error("Lỗi khi lấy dữ liệu từ localStorage:", error);
      return null;
  }
}
