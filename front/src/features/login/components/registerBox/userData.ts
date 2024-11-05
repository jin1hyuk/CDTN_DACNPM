// userData.ts
export interface User {
    name: string;
    email: string;
    password: string;
}

// Shared user data array
export const users: User[] = [
    { name: "Nguyễn Văn A", email: "user1@example.com", password: "password123" },
    { name: "Trần Thị B", email: "user2@example.com", password: "password456" },
    { name: "Quản Trị Viên", email: "admin@example.com", password: "admin123" }
];
