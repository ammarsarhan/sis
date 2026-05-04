import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/$cycleId/documents/review/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className='flex flex-col h-full'>
        <div className='h-full'>
          
        </div>
        <div className='flex items-center justify-center gap-x-4 p-4 bg-muted/50 border-t text-sm'>
          
        </div>
    </div>
  )
}
