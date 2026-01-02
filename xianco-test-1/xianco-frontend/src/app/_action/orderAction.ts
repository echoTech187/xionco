/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { orderUseCase } from "@/di/modules";
import { saveOrderSchema } from "@/lib/validations/order";
import { PostOrder } from "@/lib/types/order";

export async function saveOrderAction(prevState: any, formData: FormData) {
    const payloadRaw = formData.get("payload") as string;

    if (!payloadRaw) {
        return { success: false, message: "Invalid Data", error: "No payload provided" };
    }

    const rawData = JSON.parse(payloadRaw);
    // Validasi
    const validated = saveOrderSchema.safeParse(rawData);

    if (!validated.success) {
        return {
            success: false,
            message: "Validasi Gagal",
            error: validated.error.issues.map(e => e.message).join(", ")
        };
    }

    // Mapping ke PostOrder (pastikan field sesuai backend)
    const dataToSave: PostOrder = {
        id: validated.data.id,
        customer_id: validated.data.customer_id,
        customer_name: validated.data.customer_name,
        payment_method_id: validated.data.payment_method_id,
        payment_method: validated.data.payment_method,
        payment_status_id: validated.data.payment_status_id,
        payment_status: validated.data.payment_status,
        order_status_id: validated.data.order_status_id,
        order_status: validated.data.order_status,
        order_item: validated.data.order_item,
        total_price: validated.data.total_price
    };

    const response = await orderUseCase.createOrder(dataToSave);
    if (response.success) {
        return { success: true, message: response.message, description: response.description };
    } else {
        return { success: false, message: response.message, error: response.error };
    }
}

// ... deleteOrderAction tetap sama
export async function deleteOrderAction(prevState: any, id: string) {
    if (!id) return { success: false, message: "ID tidak ditemukan" };
    const response = await orderUseCase.deleteOrder(id);
    if (response.success) return { success: true, message: response.message };
    return { success: false, message: response.message, error: response.error };
}