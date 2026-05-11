import { createFileRoute, useParams } from '@tanstack/react-router'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import ApplicantsTable from '@/components/dashboard/applicants/ApplicantsTable'

export const Route = createFileRoute('/dashboard/_protected/applicants/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { cycleId } = useParams({ strict: false });

  return <>
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
              <BreadcrumbPage>Applications</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
    <div className="flex flex-col gap-y-0.5 mb-4 mx-6">
        <h1 className="text-xl font-medium">Applicants</h1>
        <p className="text-gray-500 text-sm">Track applicants and link them to their submitted applications across admission cycles.</p>
    </div>
    <main className='px-6 py-4'>
      <ApplicantsTable cycleId={cycleId!}/>
    </main>
  </>
}
