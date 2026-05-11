import { Outlet, createFileRoute } from '@tanstack/react-router'
import DashboardProvider from '@/providers/DashboardProvider';

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
    return (
        <DashboardProvider>
            <Outlet />
        </DashboardProvider>
    )
}
