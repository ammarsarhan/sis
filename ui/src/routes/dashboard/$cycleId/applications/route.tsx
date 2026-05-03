import { Outlet, createFileRoute, useParams } from '@tanstack/react-router';

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import ApplicationsNavigation from '@/components/dashboard/applications/ApplicationsNavigation';

type ApplicationStatus = "DRAFT" | "SUBMITTED" | "ACCEPTED" | "REJECTED";

export const Route = createFileRoute('/dashboard/$cycleId/applications')({
  validateSearch: (search) => ({
    status: search.status as ApplicationStatus | undefined,
    page: Number(search.page ?? 1),
    limit: Number(search.limit ?? 10),
  }),
  component: RouteComponent
});
function RouteComponent() {
  const { cycleId } = useParams({ strict: false });

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
                  <BreadcrumbLink href="/dashboard/$cycleId/overview">
                    Fall 2027
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Applications</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <ApplicationsNavigation cycleId={cycleId!} />
        <Outlet/>
    </>
  )
}
