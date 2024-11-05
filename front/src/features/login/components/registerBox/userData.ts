export interface User {
    name: string;
    email: string;
    password: string;
    verifyCode: string; // Add this field
}

export const users: User[] = [
    { name: "Nguyễn Văn A", email: "user1@example.com", password: "password123", verifyCode: "123456" },
    { name: "Trần Thị B", email: "user2@example.com", password: "password456", verifyCode: "654321" },
    { name: "Quản Trị Viên", email: "admin@example.com", password: "admin123", verifyCode: "000000" }
];
