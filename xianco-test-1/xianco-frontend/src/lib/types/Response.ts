import { Product, Stock } from "@/lib/types/product";
import { Order } from "@/lib/types/order";

export type LoginResponse = {
    success: boolean;
    message: string;
    description?: string;
    error?: string | string[];
    token?: string;

};

export type ProductResponse = {
    success: boolean;
    message: string;
    description?: string;
    error?: string | string[];
    data?: Product[]
}

export type StockProductResponse = {
    success: boolean;
    message: string;
    description?: string;
    error?: string | string[];
    data?: Stock[]
}

export type OrderResponse = {
    success: boolean;
    message: string;
    description?: string;
    error?: string | string[];
    data?: Order[]
}

export type ApiResponse = {
    success: boolean;
    message: string;
    description?: string;
    error?: string | string[];
    data?: []
}

export type User = {
    slug: string;
    fullname: string;
    username: string;
    email: string;
    is_online: boolean;
}