import { IOwner } from "./owner";

export interface IPost {
    id: string;
    content: string;
    likedBy: string[];
    commentedBy: string[];
    createdAt: string;
    by: IOwner;
    liked?: boolean;
    commented?: boolean;
}
