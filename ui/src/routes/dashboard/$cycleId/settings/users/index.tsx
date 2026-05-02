import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Plus } from 'lucide-react';

import UsersTable from '@/components/dashboard/settings/UsersTable';
import InvitationsTable from '@/components/dashboard/settings/InvitationsTable';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/dashboard/$cycleId/settings/users/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [payload, setPayload] = useState<string | null>(null);

  return (
    <main className='px-6 mt-4 mb-12 flex flex-col gap-y-6'>
      <div className='flex flex-col gap-y-0.5'>
        <h2 className='font-medium'>Staff Users</h2>
        <p className='text-gray-500 text-[0.8125rem]'>Keep track of all of the users with access to the admin dashboard within this admission cycle.</p>
      </div>  
      <UsersTable />
      <div className='flex items-end justify-between gap-x-16'>
        <div className='flex flex-col gap-y-0.5'>
          <h2 className='font-medium'>Invitations</h2>
          <p className='text-gray-500 text-[0.8125rem]'>Check the status of all outbound invitations sent to provide access to the system.</p>
        </div>  
        <Button variant="ghost" size="sm" className="font-normal" onClick={() => setPayload("ammaryasser6.2006@gmail.com")}>
          <Plus className='size-4' />
          <span className='text-[0.825rem]'>Add invitation</span>
        </Button>
      </div>
      <InvitationsTable payload={payload} setPayload={setPayload}/>
    </main>
  )
}
