import { Navigate, createFileRoute } from '@tanstack/react-router';
import { useDashboard } from '@/providers/DashboardProvider';

export const Route = createFileRoute('/dashboard/_protected/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { cycle } = useDashboard();
  return <Navigate to={"/dashboard/$cycleId/overview"} params={{ cycleId: cycle.id }} />
}
