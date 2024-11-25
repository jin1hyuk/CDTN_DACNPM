export interface User {
    id?: string;
    username: string;
    email: string;
    fullName: string;
    date: string;
    phoneNumber: string;
    address: string;
    password: string;
    isActive: boolean;
    profilePictureUrl: string;
    verificationCode: string;
    roles: string[]
}

export interface ReqUser {
    username: string;
    email?: string;
    password: string;
}
