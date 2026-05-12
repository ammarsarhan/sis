import { createFileRoute, useParams } from '@tanstack/react-router'
import ApplicationsTable from '@/components/dashboard/applications/ApplicationsTable'
import { TabNavigation } from '@/components/shared/TabNavigation';

type ApplicationStatus = "DRAFT" | "SUBMITTED" | "ACCEPTED" | "REJECTED";

export const Route = createFileRoute('/dashboard/_protected/$cycleId/applications/')({
  validateSearch: (search) => ({
    status: search.status as ApplicationStatus | undefined,
    page: Number(search.page ?? 1),
    limit: Number(search.limit ?? 10),
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const { cycleId } = useParams({ strict: false });
  const { status } = Route.useSearch();

  const tabs = [
    { label: "All",      status: undefined },
    { label: "Pending",  status: "SUBMITTED" },
    { label: "Accepted", status: "ACCEPTED" },
    { label: "Rejected", status: "REJECTED" },
  ].map(({ label, status: index }) => ({
    type: "link" as const,
    label,
    to: "/dashboard/$cycleId/applications",
    params: { cycleId },
    search: (prev: Record<string, unknown>) => ({
      ...prev,
      status: index,
      page: 1,
      limit: (prev.limit as number | undefined) ?? 10,
    }),
    isActive: status === index,
  }));

  return (
    <>
      <div className="pt-4">
        <div className="flex flex-col gap-y-0.5 mb-4 mx-6">
          <h1 className="text-xl font-medium">Applications</h1>
          <p className="text-gray-500 text-sm">View and track applications with advanced filtering to bulk accept applicants.</p>
        </div>
        <TabNavigation tabs={tabs} />
      </div>
      <main className='px-6 pb-6 pt-3'>
        <ApplicationsTable status={status} />
      </main>
    </>
  )
}