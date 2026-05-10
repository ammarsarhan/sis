import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import type User from "@/lib/types/User";
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
        throw new Error("useAuth must be used within AuthProvider");
    }

    return context;
};

// Mock user object to be used until data is returned properly from the API.
const user = {
    name: "Ammar Yasser",
    email: "superadmin@ejust.edu.eg",
    isVerified: true,
    isRoot: true
};

export default function AuthProvider({ children }: { children: ReactNode }) {
    const queryClient = useQueryClient();

    const { data, isLoading, error } = useQuery({
        queryKey: ["session"],
        queryFn: fetchUser,
        retry: false,
        staleTime: 1000 * 60 * 5,
    });

    // Todo: Uncomment this when the API returns data properly.
    // const user = error ? null : data ?? null;

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
