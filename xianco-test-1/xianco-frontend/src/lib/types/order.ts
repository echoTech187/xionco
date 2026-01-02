import { Product } from "./product";

export type OrderStatus = {
    id: string;
    name: string;
}
export type PaymentStatus = {
    id: string;
    name: string;
}

export type OrderItem = {
    id?: string;
    order_id?: string;
    product_id: string;
    productName: string;
    quantity: string;
    price: string;
    amount?: string;
    product?: Product
}

export type Order = {
    id: string;
    order_number?: string;
    customer_id: string;
    customer_name: string;
    payment_method_id: string;
    payment_method: string;
    payment_status_id: string;
    payment_status: string;
    order_status_id: string;
    order_status: string;
    order_item: OrderItem[];
    total_price: string;
    is_active: boolean;
    createdAt?: string;
}

export type PostOrder = {
    id?: string;
    customer_id: string;
    customer_name: string;
    payment_method_id: string;
    payment_method: string;
    payment_status_id: string;
    payment_status: string;
    order_status_id: string;
    order_status: string;
    total_price: string | number;
    order_item: {
        id?: string;
        order_id?: string;
        product_id: string;
        productName: string;
        quantity: string;
        price: string;
    }[];
}

export type Customer = {
    id: string;
    name: string;
}

export type PaymentMethod = {
    id: string;
    name: string;
}