import { ObjectId } from "mongodb";

export interface Review {
    _id?: ObjectId | string;
    productId: string;
    author: string;
    rating: number;
    comment: string;
    createdAt: string;
}
