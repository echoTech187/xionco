import z from "zod";

export const saveOrderSchema = z.object({
    id: z.string().optional(),
    customer_id: z.string().min(1, "Nama pelanggan wajib diisi"),
    customer_name: z.string().min(1, "Nama pelanggan wajib diisi"),
    payment_method_id: z.string().min(1, "Metode pembayaran wajib diisi"),
    payment_method: z.string().min(1, "Metode pembayaran wajib diisi"),
    payment_status_id: z.string().min(1, "Status pembayaran wajib diisi"),
    payment_status: z.string().min(1, "Status pembayaran wajib diisi"),
    order_status_id: z.string().min(1, "Status wajib diisi"),
    order_status: z.string().min(1, "Status wajib diisi"),
    total_price: z.string().min(1, "Total harga wajib diisi"),
    order_item: z.array(z.object({
        product_id: z.string().min(1, "Produk harus dipilih"),
        productName: z.string().min(1, "Minimal 1"),
        quantity: z.string().min(1, "Minimal 1"),
        price: z.string().min(1, "Minimal 1"),
        amount: z.string().min(1, "Minimal 1"),
    })).min(1, "Minimal harus ada 1 barang"),
});