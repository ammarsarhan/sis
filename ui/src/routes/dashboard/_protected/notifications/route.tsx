import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/_protected/notifications')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
        
        <Outlet />
    </>
  )
}
