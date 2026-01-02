import { loginProps } from "../entities/payload";
import { ApiResponse, LoginResponse } from "@/lib/types/Response";

export interface AuthRepository {
    signin(payload: loginProps): Promise<LoginResponse>;
    profile(): Promise<ApiResponse>;
}