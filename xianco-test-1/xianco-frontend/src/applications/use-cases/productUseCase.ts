import { ProductResponse, StockProductResponse } from "@/lib/types/Response";
import { ProductRepository } from "@/core/repositories/ProductRepository";
import { PostProduct, PostStock } from "@/lib/types/product";

export class ProductUseCase {
    constructor(private productRepository: ProductRepository) { }
    async initProducts(): Promise<ProductResponse> {
        return this.productRepository.initProducts();
    }

    async saveProduct(data: PostProduct): Promise<ProductResponse> {

        return this.productRepository.saveProduct(data);
    }

    async deleteProduct(id: string): Promise<ProductResponse> {
        return this.productRepository.deleteProduct(id);
    }

    async initStocks(): Promise<StockProductResponse> {
        return this.productRepository.initStocks();
    }

    async saveStock(data: PostStock): Promise<ProductResponse> {
        return this.productRepository.saveStock(data);
    }

}