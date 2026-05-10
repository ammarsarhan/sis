import RequestError, { ERROR_CODES } from "@/lib/types/api";

export const BASE_URL = import.meta.env.VITE_API_URL;

export default async function request<T>(target: string, options?: RequestInit): Promise<T> {
    let response = await fetch(`${BASE_URL}${target}`, {
        ...options,
        credentials: "include",
    });

    let data;

    if (response.status === 401) {
        const refresh = await fetch(`${BASE_URL}/auth/refresh`,
            {
                method: "POST",
                credentials: "include",
            },
        );

        data = await refresh.json();

        if (!refresh.ok) {
            throw new RequestError(data.message, ERROR_CODES.UNAUTHORIZED);
        };

        response = await fetch(`${BASE_URL}${target}`, {
            ...options,
            credentials: "include",
        });
    };

    data = await response.json();

    if (!response.ok) {
        throw new RequestError(data.message, data.code);
    };

    return data;
}