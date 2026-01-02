import z from "zod";

export const saveProductSchema = z.object({
    id: z.string().optional(),
    name: z.string().optional(),
    sku: z.string().optional(),
    description: z.string().optional(),
    price: z.number().optional(),
    category: z.string().optional(),
    image: z.string().optional(),
});