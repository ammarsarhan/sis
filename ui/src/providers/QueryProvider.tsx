import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";

import type { ReactNode } from "react";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60,
        },
        mutations: {
            retry: false,
        },
    },
});

export default function QueryProvider({ children }: { children: ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}