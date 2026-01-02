import z from "zod";

export const productStockSchema = z.object({
    product_id: z.string(),
    current_stock: z.string(),
});