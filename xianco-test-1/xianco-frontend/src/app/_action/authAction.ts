import { loginProps } from "@/core/entities/payload";
import { authUseCase } from "@/di/modules";
import { setSession } from "@/lib/auth";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function siginAction(prevState: any, formData: FormData) {
    const username = formData.get("username");
    const password = formData.get("password");
    if (!username || !password) {
        return {
            success: false,
            message: "Username/Password harus diisi.",
            error: "FIELD_REQUIRED"
        };
    }
    const payload = { username: username, password: password };
    const signIn = await authUseCase.signin(payload as loginProps);
    if (signIn.success) {
        await setSession('token', signIn.token as string);
        return {
            success: true,
            message: "Login Berhasil.",
            description: "Selamat Datang di Xionco Admin Panel.",
        };
    } else {
        return {
            success: false,
            message: signIn.message,
            error: signIn.error
        };
    }
}

export async function getUserProfile() {
    const profile = await authUseCase.profile();
    return profile;
}