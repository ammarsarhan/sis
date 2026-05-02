import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/$cycleId/settings/offerings/')(
  {
    component: RouteComponent,
  },
)

function RouteComponent() {
  return <div>Hello "/dashboard/$cycleId/settings/offerings/"!</div>
}
