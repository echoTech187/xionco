import { AuthUseCase } from "@/applications/use-cases/authUseCase";
import { OrderUseCase } from "@/applications/use-cases/OrderUseCase";
import { ProductUseCase } from "@/applications/use-cases/productUseCase";
import { ApiAuthRepository } from "@/infrastructure/repositories/ApiAuthRepository";
import { ApiOrderRepository } from "@/infrastructure/repositories/ApiOrderRepository";
import { ApiProductRepository } from "@/infrastructure/repositories/ApiProductRepository";

const autRepo = new ApiAuthRepository();
const authUseCase = new AuthUseCase(autRepo);

const productRepo = new ApiProductRepository();
const productUseCase = new ProductUseCase(productRepo);

const orderRepo = new ApiOrderRepository();
const orderUseCase = new OrderUseCase(orderRepo);

export { authUseCase, productUseCase, orderUseCase };