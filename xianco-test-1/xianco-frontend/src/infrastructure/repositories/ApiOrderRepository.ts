import { api } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { PostOrder } from "@/lib/types/order";
import { ApiResponse, OrderResponse } from "@/lib/types/Response";

export class ApiOrderRepository {
    async getAllOrders(): Promise<OrderResponse> {
        const token = await getToken();
        const response: OrderResponse = await api.get('/orders', {
            token: token?.value,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    }

    async getOrderById(id: string): Promise<OrderResponse> {
        const token = await getToken();
        const response: OrderResponse = await api.get(`/order/${id}`, {
            token: token?.value,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    }

    async createOrder(order: PostOrder): Promise<OrderResponse> {
        const token = await getToken();
        const response: OrderResponse = await api.post('/order', JSON.stringify(order), {
            token: token?.value,
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response;
    }

    async updateOrder(id: string, order: PostOrder): Promise<OrderResponse> {
        const token = await getToken();
        const response: OrderResponse = await api.put(`/order/${id}`, JSON.stringify(order), {
            token: token?.value,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    }

    async deleteOrder(id: string): Promise<OrderResponse> {
        const token = await getToken();
        const response: OrderResponse = await api.delete(`/order/${id}`, {
            token: token?.value,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    }

    async getCustomers(): Promise<ApiResponse> {
        const token = await getToken();
        const response: ApiResponse = await api.get('/customers', {
            token: token?.value,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    }

    async getOrderStatuses(): Promise<ApiResponse> {
        const token = await getToken();
        const response: ApiResponse = await api.get('/order-statuses', {
            token: token?.value,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    }

    async getPaymentMethods(): Promise<ApiResponse> {
        const token = await getToken();
        const response: ApiResponse = await api.get('/payment-methods', {
            token: token?.value,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    }

    async getPaymentStatuses(): Promise<ApiResponse> {
        const token = await getToken();
        const response: ApiResponse = await api.get('/payment-statuses', {
            token: token?.value,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    }

}