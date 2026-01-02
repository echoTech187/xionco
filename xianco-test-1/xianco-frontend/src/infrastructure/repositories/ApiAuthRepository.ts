import { loginProps } from "@/core/entities/payload";
import { ApiResponse, LoginResponse } from "@/lib/types/Response";
import { AuthRepository } from "@/core/repositories/authRepository";
import { api } from "@/lib/api";
import { getToken } from "@/lib/auth";

export class ApiAuthRepository implements AuthRepository {
    async signin(payload: loginProps): Promise<LoginResponse> {
        const response: LoginResponse = await api.post('/auth', JSON.stringify(payload));
        return response;
    }

    async profile(): Promise<ApiResponse> {
        const token = await getToken();
        const response: ApiResponse = await api.get('/profile', {
            token: token?.value,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    }
}