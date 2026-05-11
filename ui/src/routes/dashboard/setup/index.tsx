import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/setup/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='h-screen w-screen flex items-center justify-center'>Hello "/dashboard/setup/"!</div>
}
