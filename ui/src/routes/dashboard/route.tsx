import { Outlet, createFileRoute } from '@tanstack/react-router'
import Aside from '@/components/dashboard/Aside'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
    return (
        <SidebarProvider>
            <Aside />
            <SidebarInset>
                <Outlet />
            </SidebarInset>
        </SidebarProvider>
    )
}
