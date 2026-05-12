import { createFileRoute, useParams } from '@tanstack/react-router';
import DocumentsTable from '@/components/dashboard/documents/DocumentsTable';
import { TabNavigation } from "@/components/shared/TabNavigation";

type DocumentStatus = "UPLOADED" | "ACCEPTED" | "REJECTED";

export const Route = createFileRoute('/dashboard/_protected/$cycleId/documents/')({
  component: RouteComponent,
  validateSearch: (search) => ({
    status: search.status as DocumentStatus | undefined,
    page: Number(search.page ?? 1),
    limit: Number(search.limit ?? 10),
  }),
});

function RouteComponent() {
  const { cycleId } = useParams({ strict: false });
  const { status: currentStatus } = Route.useSearch();

  const tabs = [
    { label: "Pending",  status: "UPLOADED" },
    { label: "Accepted", status: "ACCEPTED" },
    { label: "Rejected", status: "REJECTED" },
  ].map(({ label, status }) => ({
    type: "link" as const,
    label,
    to: "/dashboard/$cycleId/documents",
    params: { cycleId },
    search: (prev: Record<string, unknown>) => ({
      ...prev,
      status,
      page: 1,
      limit: (prev.limit as number | undefined) ?? 10,
    }),
    isActive: currentStatus === status,
  }));

  return (
    <div className="flex flex-col">
      <TabNavigation tabs={tabs}/>
      <main className="px-6 pb-6 pt-3">
        <DocumentsTable status={currentStatus} />
      </main>
    </div>
  );
}