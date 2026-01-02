import { loginProps } from "@/core/entities/payload";
import { ApiResponse, LoginResponse } from "@/lib/types/Response";
import { AuthRepository } from "@/core/repositories/authRepository";
export class AuthUseCase {
    constructor(private authRepository: AuthRepository) { }
    async signin(payload: loginProps): Promise<LoginResponse> {
        return this.authRepository.signin(payload);
    }
    async profile(): Promise<ApiResponse> {
        return this.authRepository.profile();
    }
}