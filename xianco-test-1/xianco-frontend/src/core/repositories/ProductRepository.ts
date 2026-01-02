import { PostProduct, PostStock } from "@/lib/types/product";
import { ProductResponse, StockProductResponse } from "@/lib/types/Response";


export interface ProductRepository {
    initProducts(): Promise<ProductResponse>
    saveProduct(data: PostProduct): Promise<ProductResponse>
    deleteProduct(id: string): Promise<ProductResponse>
    initStocks(): Promise<StockProductResponse>
    saveStock(data: PostStock): Promise<ProductResponse>
}
