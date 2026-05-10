import { Outlet, createFileRoute } from '@tanstack/react-router'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import AppSidebar from '@/components/dashboard/aside/AppSidebar';
import DashboardProvider from '@/providers/DashboardProvider';

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
    return (
        <DashboardProvider>
            <SidebarProvider>
                <AppSidebar/>
                <SidebarInset>
                    <Outlet/>
                </SidebarInset>
            </SidebarProvider>
        </DashboardProvider>
    )
}
