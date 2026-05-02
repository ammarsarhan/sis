import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/$cycleId/settings/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className='px-6'>
      
    </main>
  )
}
