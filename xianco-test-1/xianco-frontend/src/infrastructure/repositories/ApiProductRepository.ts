import { ProductResponse, StockProductResponse } from "@/lib/types/Response";
import { ProductRepository } from "@/core/repositories/ProductRepository";
import { api } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { PostProduct, PostStock } from "@/lib/types/product";

export class ApiProductRepository implements ProductRepository {
    async initProducts(): Promise<ProductResponse> {
        const token = await getToken();
        const response: ProductResponse = await api.get('/products', {
            token: token?.value,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    }
    async saveProduct(data: PostProduct): Promise<ProductResponse> {
        const token = await getToken();
        const postData = {
            id: data.id,
            name: data.name,
            sku: data.sku,
            price: data.price,
            category: data.category,
            image: data.image,
            description: data.description
        }
        const response: ProductResponse = await api.post('/product', JSON.stringify(postData), {
            token: token?.value,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    }
    async deleteProduct(id: string): Promise<ProductResponse> {
        const token = await getToken();
        const response: ProductResponse = await api.delete(`/product/${id}`, {
            token: token?.value,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    }
    async initStocks(): Promise<StockProductResponse> {
        const token = await getToken();
        const response: StockProductResponse = await api.get('/stocks', {
            token: token?.value,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    }

    async saveStock(data: PostStock): Promise<ProductResponse> {
        const token = await getToken();
        const response: ProductResponse = await api.post('/stock', JSON.stringify(data), {
            token: token?.value,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    }
}
