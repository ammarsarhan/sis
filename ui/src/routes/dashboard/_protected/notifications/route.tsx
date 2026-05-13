import { Outlet, createFileRoute } from '@tanstack/react-router'
import { TabNavigation } from '@/components/shared/TabNavigation'
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';

export const Route = createFileRoute('/dashboard/_protected/notifications')({
  component: RouteComponent,
})

function RouteComponent() {
  const tabs = [
    { label: "Notifications", to: "/dashboard/notifications" },
    { label: "Templates",     to: "/dashboard/notifications/templates" },
  ].map(({ label, to }) => ({
    type: "link" as const,
    label,
    to,
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
              <BreadcrumbItem>
                <BreadcrumbPage>Notifications</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-col gap-y-0.5 pb-1 mx-6">
          <h1 className="text-xl font-medium">Notifications</h1>
          <p className="text-gray-500 text-sm">Send out notifications to active applicants to keep them updated on information.</p>
      </div>
      <TabNavigation tabs={tabs} />
      <Outlet />
    </>
  )
}
