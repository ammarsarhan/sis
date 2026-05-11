import { Outlet, createFileRoute } from '@tanstack/react-router'
import { useAuth } from '@/providers/AuthProvider';
import Logo from '@/assets/logo.png';

export const Route = createFileRoute('/dashboard/setup')({
  component: RouteComponent,
})

function RouteComponent() {
    const { user } = useAuth();

    if (!user) {
        return (
            <div className='w-screen h-screen fixed z-99 flex items-center justify-center'>
                <img src={Logo} className="absolute top-4 left-4 brightness-0 w-10"/>
                <div className='flex flex-col text-center gap-y-2 max-w-1/2'>
                    <h1 className='text-lg font-medium'>Could not authenticate user</h1>
                    <p className='text-gray-400 text-sm'>Failed to log in user back into account. Please try to log in again manually. If you feel like this is a mistake, please get in touch with technical support.</p>
                    <span className="text-gray-400 text-xs block mt-1">ERR: USER_NOT_AUTHORIZED</span>
                </div>
                {/* Todo: Add a button to redirect them back to /auth/sign-in */}
            </div>
        )
    };

    if (!user.isRoot) {
        return (
            <div className='w-screen h-screen fixed z-99 flex items-center justify-center'>
                <img src={Logo} className="absolute top-4 left-4 brightness-0 w-10"/>
                <div className='flex flex-col text-center gap-y-2 max-w-1/2'>
                    <h1 className='text-lg font-medium'>Can not setup admission cycle</h1>
                    <p className='text-gray-400 text-sm'>Access to this resource requires root permissions. If you are a superadmin, please get in touch with technical support.</p>
                    <span className="text-gray-400 text-xs block mt-1">ERR: USER_NOT_PERMITTED</span>
                </div>
                {/* Todo: Add a button to redirect them back to /auth/sign-in */}
            </div>
        );
    }

    return <Outlet />
}
