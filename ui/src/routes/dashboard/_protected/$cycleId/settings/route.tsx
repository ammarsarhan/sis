import { Link, Outlet, createFileRoute } from '@tanstack/react-router';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

import { useDashboard } from '@/providers/DashboardProvider';
import { TabNavigation } from '@/components/shared/TabNavigation';

export const Route = createFileRoute('/dashboard/_protected/$cycleId/settings')({
  component: RouteComponent,
})

function RouteComponent() {
  const { cycle } = useDashboard();
  
  const tabs = [
    { label: "General",            to: "/dashboard/$cycleId/settings" },
    { label: "Offerings",          to: "/dashboard/$cycleId/settings/offerings" },
    { label: "Event Log",          to: "/dashboard/$cycleId/settings/events" },
    { label: "Users",to: "/dashboard/$cycleId/settings/users" },
  ].map(({ label, to }) => ({
    type: "link" as const,
    label,
    to,
    params: { cycleId: cycle.id },
    activeOptions: { exact: true },
  }));

  return (
    <>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4 my-auto"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  Dashboard
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink asChild>
                    <Link to={`/dashboard/$cycleId/overview`} params={{ cycleId: cycle.id }}>
                      {cycle.name}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Settings</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <h1 className="text-xl font-medium mx-6">Settings</h1>
        <TabNavigation tabs={tabs} />
        <Outlet />
    </>
  )
}
