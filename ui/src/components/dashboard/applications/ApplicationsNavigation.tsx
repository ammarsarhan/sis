import { Link, useSearch } from "@tanstack/react-router";
import { Route } from "@/routes/dashboard/$cycleId/applications";

export default function ApplicationsNavigation({ cycleId }: { cycleId: string }) {
  const search = useSearch({ from: Route.id });

  const currentStatus = search.status;

  function tabClass(targetStatus?: string) {
    const isActive = (currentStatus ?? undefined) === targetStatus;

    return `px-4 py-2 border-b-[1.5px] ${
      isActive
        ? "border-black font-medium text-black"
        : "border-transparent text-gray-500"
    }`;
  }

  return (
    <div className="mx-6">
      <div className="flex flex-col gap-y-0.5 mb-4">
        <h1 className="text-xl font-medium">Applications</h1>
        <p className="text-gray-500 text-sm">View and track applications with advanced filtering to bulk accept applicants.</p>
      </div>
      <nav className="flex w-full text-sm mt-1.5 mb-4 border-b">
        <Link
          to="/dashboard/$cycleId/applications"
          params={{ cycleId }}
          search={(prev) => ({ ...prev, status: undefined, page: 1, limit: prev.limit ?? 10 })}
          className={tabClass(undefined)}
        >
          All
        </Link>
        <Link
          to="/dashboard/$cycleId/applications"
          params={{ cycleId }}
          search={(prev) => ({ ...prev, status: "SUBMITTED", page: 1, limit: prev.limit ?? 10 })}
          className={tabClass("SUBMITTED")}
        >
          Pending
        </Link>
        <Link
          to="/dashboard/$cycleId/applications"
          params={{ cycleId }}
          search={(prev) => ({ ...prev, status: "ACCEPTED", page: 1, limit: prev.limit ?? 10 })}
          className={tabClass("ACCEPTED")}
        >
          Accepted
        </Link>

        <Link
          to="/dashboard/$cycleId/applications"
          params={{ cycleId }}
          search={(prev) => ({ ...prev, status: "REJECTED", page: 1, limit: prev.limit ?? 10 })}
          className={tabClass("REJECTED")}
        >
          Rejected
        </Link>
      </nav>
    </div>
  );
}