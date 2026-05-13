import { createFileRoute } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import InvitationsTable from '@/components/dashboard/settings/InvitationsTable'

export const Route = createFileRoute(
  '/dashboard/_protected/$cycleId/settings/users/invitations/',
)({
  component: RouteComponent,
})

function RouteComponent() {
    const [payload, setPayload] = useState<string | null>(null);

    return (
        <main className='px-6 mt-4 mb-12 flex flex-col gap-y-6'>
            <div className='flex items-end justify-between gap-x-16'>
                <div className='flex flex-col gap-y-0.5'>
                    <h2 className='font-medium'>Invitations</h2>
                    <p className='text-gray-500 text-[0.8125rem]'>Check the status of all outbound invitations sent to provide access to the system.</p>
                </div>
                <Button onClick={() => setPayload("ammaryasser6.2006@gmail.com")}>
                    <Plus className="size-3.5" />
                    <span className='font-normal text-[0.8125rem]'>Add Invitation</span>
                </Button>
            </div>
            <InvitationsTable payload={payload} setPayload={setPayload}/>
        </main>
    )
}
