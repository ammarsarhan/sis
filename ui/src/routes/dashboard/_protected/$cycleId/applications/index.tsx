import { createFileRoute, useParams } from '@tanstack/react-router'
import ApplicationsTable from '@/components/dashboard/applications/ApplicationsTable'
import ApplicationsNavigation from '@/components/dashboard/applications/ApplicationsNavigation';

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

  return (
    <>
      <ApplicationsNavigation cycleId={cycleId!} />
      <main className='px-6 pb-6 pt-3'>
        <ApplicationsTable status={status} />
      </main>
    </>
  )
}