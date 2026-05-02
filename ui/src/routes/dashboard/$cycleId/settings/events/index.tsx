import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/$cycleId/settings/events/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/$cycleId/settings/events/"!</div>
}
