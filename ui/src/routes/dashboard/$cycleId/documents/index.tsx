import { createFileRoute, useParams } from '@tanstack/react-router';
import DocumentsNavigation from '@/components/dashboard/documents/DocumentsNavigation';
import DocumentsTable from '@/components/dashboard/documents/DocumentsTable';

type DocumentStatus = "UPLOADED" | "ACCEPTED" | "REJECTED";

export const Route = createFileRoute('/dashboard/$cycleId/documents/')({
  component: RouteComponent,
  validateSearch: (search) => ({
    status: search.status as DocumentStatus | undefined,
    page: Number(search.page ?? 1),
    limit: Number(search.limit ?? 10),
  }),
})

function RouteComponent() {
  const { cycleId } = useParams({ strict: false });
  const { status } = Route.useSearch();
  
  return (
    <div className='h-screen flex flex-col'>
      <DocumentsNavigation cycleId={cycleId!}/>
      <main className='p-6'>
        <DocumentsTable status={status} />
      </main>
    </div>
  )
}
