import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/dashboard/_protected/notifications/templates/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/_protected/notifications/templates/"!</div>
}
