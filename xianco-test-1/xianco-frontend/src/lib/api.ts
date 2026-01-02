// src/lib/api.ts
interface RequestOptions extends Omit<RequestInit, 'body'> {
    token?: string;
    body?: unknown;
}

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || process.env.BACKEND_PUBLIC_API_URL;

if (!BASE_URL) {
    throw new Error('NEXT_PUBLIC_BACKEND_API_URL is not defined in environment variables');
}

if (!BASE_URL.startsWith("http")) {
    throw new Error(`NEXT_PUBLIC_BACKEND_API_URL must start with http:// or https://. Current value: ${BASE_URL}`);
}

async function apiFetch<T>(
    endpoint: string,
    options?: RequestOptions
): Promise<T> {
    const { headers, body, token, ...customConfig } = options || {};

    const config: RequestInit = {
        method: options?.method || 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...headers,
        },
        ...customConfig,
    };

    if (body) {
        if (typeof body === 'string') {
            config.body = body;
        } else if (typeof body === 'object') {
            if (body instanceof FormData) {
                config.body = body;
            } else {
                config.body = JSON.stringify(body);
            }
        } else {
            throw new Error(`Unsupported body type: ${typeof body}`);
        }
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
        } catch {
            // If response is not JSON, use default message
            errorMessage = response.statusText || errorMessage;
        }
        return errorMessage as unknown as T;
    }

    // Handle cases where the response might not have a body (e.g., 204 No Content)
    if (response.status === 204) {
        return null as T;
    }

    return await response.json();
}

export const api = {
    get: <T>(endpoint: string, options?: RequestOptions) => apiFetch<T>(endpoint, { method: 'GET', ...options }),
    post: <T>(endpoint: string, body: BodyInit | null | undefined, options?: RequestOptions) => apiFetch<T>(endpoint, { method: 'POST', body, ...options }),
    put: <T>(endpoint: string, body: BodyInit | null | undefined, options?: RequestOptions) => apiFetch<T>(endpoint, { method: 'PUT', body, ...options }),
    delete: <T>(endpoint: string, options?: RequestOptions) => apiFetch<T>(endpoint, { method: 'DELETE', ...options }),
};
