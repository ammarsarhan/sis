import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import ApplicationsTable from '@/components/dashboard/applications/ApplicationsTable'

const applicationStatusSchema = z.enum(['DRAFT', 'SUBMITTED', 'ACCEPTED', 'REJECTED']).optional()

export const Route = createFileRoute('/dashboard/$cycleId/applications/')({
  validateSearch: z.object({
    status: applicationStatusSchema,
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