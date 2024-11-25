import { User } from "./User";

export interface Comment {
    commentId?: string;
    postId?: string;
    userId?: string;
    content?: string;
    createdAt?: string;
    updatedAt?: string;
    user?: User;
}