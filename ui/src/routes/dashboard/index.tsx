import { Navigate, createFileRoute } from '@tanstack/react-router';
import { useDashboard } from '@/providers/DashboardProvider';

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
    const { cycle } = useDashboard();

  return <Navigate to={"/dashboard/$cycleId/overview"} params={{ cycleId: cycle.id }} />
}
