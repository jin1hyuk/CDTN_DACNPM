import { User } from "./User";

export interface Post {
  key: string;
    postId: string;
    userId: string;
    title: string;
    content: string;
    imagePath: string;
    createdAt?: string;
    updatedAt?: string;
    status: string;
    user: User;
  }


export interface ReqPost {
    title : string;
content : string;
imagePath : string;
updatedAt : string;
status ?: string;
}
  