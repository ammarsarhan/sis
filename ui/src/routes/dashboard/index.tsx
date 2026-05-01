import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
});

export default function RouteComponent() {
  return (
    <div>

    </div>
  )
};
