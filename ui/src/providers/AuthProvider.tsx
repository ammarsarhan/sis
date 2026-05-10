import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import type User from "@/lib/types/user";
import { deleteSession, fetchUser } from "@/lib/api/user";
import { Spinner } from "@/components/ui/spinner";

export interface AuthContextType {
    isLoading: boolean;
    user: User | null;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuthContext must be used within AuthContextProvider");
    }

    return context;
};

export default function AuthProvider({ children }: { children: ReactNode }) {
    const queryClient = useQueryClient();

    const { data, isLoading, error } = useQuery({
        queryKey: ["session"],
        queryFn: fetchUser,
        retry: false,
    });

    const user = error ? null : data ?? null;

    const signOut = async () => {
        await deleteSession();
        queryClient.setQueryData(["session"], null);
    };

    if (isLoading) {
        return (
            <div className="fixed z-99 w-screen h-screen flex items-center justify-center">
                <Spinner />
            </div>
        )
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}
