import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/dashboard/applicants/$applicantId/applications/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/applicants/$applicantId/applications/"!</div>
}
