import type User from "@/lib/types/User";
import request, { BASE_URL } from "@/lib/api/base";

export const fetchUser = async () => {
    const user = await request<User>(`/auth/session`);
    return user;
};

export const deleteSession = async () => {
    await fetch(`${BASE_URL}/auth/sign-out`, {
        method: "POST",
        credentials: "include",
    });
};
