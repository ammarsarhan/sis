import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import ApplicationsTable from '@/components/dashboard/applications/ApplicationsTable'

export const Route = createFileRoute('/dashboard/$cycleId/applications/')({
  validateSearch: z.object({
    status: z.enum(['DRAFT', 'SUBMITTED', 'ACCEPTED', 'REJECTED']).optional(),
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const { status } = Route.useSearch()

  return (
    <main className='p-6'>
      <ApplicationsTable status={status} />
    </main>
  )
}