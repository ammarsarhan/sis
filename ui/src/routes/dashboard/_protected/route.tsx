import { Navigate, Outlet, createFileRoute } from '@tanstack/react-router'
import AppSidebar from '@/components/dashboard/aside/AppSidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { useAuth } from '@/providers/AuthProvider'
import { useDashboard } from '@/providers/DashboardProvider'
import Logo from "@/assets/logo.png";

export const Route = createFileRoute('/dashboard/_protected')({
  component: RouteComponent,
})

function RouteComponent() {
    const { user } = useAuth();
    const { cycles } = useDashboard();

    if (user && user.isRoot && cycles.length <= 0) {
        return <Navigate to={"/dashboard/setup"}/>
    };

    if (user && !user.isRoot && cycles.length <= 0) {
        return (
            <div className='w-screen h-screen fixed z-99 flex items-center justify-center'>
                <img src={Logo} className="absolute top-4 left-4 brightness-0 w-10"/>
                <div className='flex flex-col text-center gap-y-2 max-w-1/2'>
                    <h1 className='text-lg font-medium'>No admission cycles for staff account.</h1>
                    <p className='text-gray-400 text-sm'>No admission cycles have been created on the system yet for this user. If you feel like this is a mistake, please get in touch with technical support.</p>
                    <span className="text-gray-400 text-xs block mt-1">ERR: NO_ADMISSION_CYCLES</span>
                </div>
            </div>
        );
    };

    return (
        <SidebarProvider>
            <AppSidebar/>
            <SidebarInset>
                <Outlet/>
            </SidebarInset>
        </SidebarProvider>
    )
}
