import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/_protected/notifications/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='mx-6 h-full grid grid-cols-3'>

    </div>
  )
}
