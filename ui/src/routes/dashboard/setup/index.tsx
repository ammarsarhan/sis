import { createFileRoute } from '@tanstack/react-router'
import { useAuth } from '@/providers/AuthProvider'

export const Route = createFileRoute('/dashboard/setup/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = useAuth();

  return <div className='h-screen w-screen flex items-center justify-center'>Hello "/dashboard/setup/"!</div>
}
