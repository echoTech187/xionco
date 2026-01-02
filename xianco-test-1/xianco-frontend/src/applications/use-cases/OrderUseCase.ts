import { OrderRepository } from "@/core/repositories/OrderRepository";
import { PostOrder } from "@/lib/types/order";
import { ApiResponse, OrderResponse } from "@/lib/types/Response";


export class OrderUseCase {
    constructor(private orderRepository: OrderRepository) {}

    getAllOrders(): Promise<OrderResponse> {
        return this.orderRepository.getAllOrders();
    }

    getOrderById(id: string): Promise<OrderResponse> {
        return this.orderRepository.getOrderById(id);
    }

    createOrder(order: PostOrder): Promise<OrderResponse> {
        return this.orderRepository.createOrder(order);
    }

    updateOrder(id: string, order: PostOrder): Promise<OrderResponse> {
        return this.orderRepository.updateOrder(id, order);
    }

    deleteOrder(id: string): Promise<OrderResponse> {
        return this.orderRepository.deleteOrder(id);
    }


    getCustomers(): Promise<ApiResponse> {
        return this.orderRepository.getCustomers();
    }

    getOrderStatuses(): Promise<ApiResponse> {
        return this.orderRepository.getOrderStatuses();
    }

    getPaymentMethods(): Promise<ApiResponse> {
        return this.orderRepository.getPaymentMethods();
    }

    getPaymentStatuses(): Promise<ApiResponse> {
        return this.orderRepository.getPaymentStatuses();
    }
    
}