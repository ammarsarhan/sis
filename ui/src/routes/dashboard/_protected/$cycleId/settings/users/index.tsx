import { Link, createFileRoute } from '@tanstack/react-router';

import { Send } from 'lucide-react';
import UsersTable from '@/components/dashboard/settings/UsersTable';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/dashboard/_protected/$cycleId/settings/users/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { cycleId } = Route.useParams();

  return (
    <main className='px-6 mt-4 mb-12 flex flex-col gap-y-6'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-y-0.5'>
          <h2 className='font-medium'>Staff Users</h2>
          <p className='text-gray-500 text-[0.8125rem]'>Keep track of all of the users with access to the admin dashboard within this admission cycle.</p>
        </div>
        <Link to="/dashboard/$cycleId/settings/users/invitations" params={{ cycleId }}>
          <Button>
            <Send className="size-3.5" />
            <span className='font-normal text-[0.8125rem]'>Invite Staff</span>
          </Button>
        </Link>
      </div>
      <UsersTable/>
    </main>
  )
}
