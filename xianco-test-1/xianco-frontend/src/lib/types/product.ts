export type Product = {
    id: string
    sku: string
    name: string
    description?: string
    price: number
    category?: string
    image?: string,
    current_stock: number | 0
}

export type PostProduct = {
    id: string
    name: string
    description: string
    sku: string
    price: string
    category: string
    image: string
}

export type Stock = {
    id: string
    product_id: string
    current_stock: number
    updatedAt?: string
}
export type PostStock = {
    product_id: string
    current_stock: string
}

export type Order = {
    id: string
    product_id: string
    quantity: number
    createdAt?: string
    updatedAt?: string
}