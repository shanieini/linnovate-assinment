import { ObjectId } from "mongodb";

export interface Product {
    _id?: ObjectId | string;
    name: string;
    imageUrl: string;
    description: string;
    price: number;
    category?: string;
    rating: number;
}
