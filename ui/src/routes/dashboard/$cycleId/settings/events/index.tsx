import { createFileRoute } from '@tanstack/react-router';
import EventTable from '@/components/dashboard/settings/EventTable';

export const Route = createFileRoute('/dashboard/$cycleId/settings/events/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className='px-6 my-4'>
      <div className='flex flex-col gap-y-0.5 mb-4'>
        <h2 className='font-medium'>Admission Cycle Event Log</h2>
        <p className='text-gray-500 text-[0.8125rem]'>Keep track of all of the actions taken within this cycle in terms of status transitions, faculty additions, settings modifications, etc...</p>
      </div>  
      <EventTable />
    </main>
  )
}
