import { Outlet, createFileRoute } from '@tanstack/react-router'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import AppSidebar from '@/components/dashboard/aside/AppSidebar';
import { useAuth } from '@/providers/AuthProvider';

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
    const { user } = useAuth();
    if (!user) return;

    return (
        <SidebarProvider>
            <AppSidebar user={user}/>
            <SidebarInset>
                <Outlet />
            </SidebarInset>
        </SidebarProvider>
    )
}
