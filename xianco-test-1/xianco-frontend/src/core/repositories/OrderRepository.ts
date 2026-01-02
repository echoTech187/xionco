import { PostOrder } from "@/lib/types/order";
import { ApiResponse, OrderResponse } from "@/lib/types/Response";

export interface OrderRepository {
    getAllOrders(): Promise<OrderResponse>;
    getOrderById(id: string): Promise<OrderResponse>;
    createOrder(order: PostOrder): Promise<OrderResponse>;
    updateOrder(id: string, order: PostOrder): Promise<OrderResponse>;
    deleteOrder(id: string): Promise<OrderResponse>;

    getCustomers(): Promise<ApiResponse>;
    getOrderStatuses(): Promise<ApiResponse>;
    getPaymentMethods(): Promise<ApiResponse>;
    getPaymentStatuses(): Promise<ApiResponse>;
}