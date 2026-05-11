import { Link, useSearch } from "@tanstack/react-router";
import { Route } from "@/routes/dashboard/_protected/$cycleId/documents";

export default function DocumentsNavigation({ cycleId }: { cycleId: string }) {
  const search = useSearch({ from: Route.id });

  const currentStatus = search.status;

  function tabClass(targetStatus: string) {
    const isActive = currentStatus === targetStatus;

    return `px-4 py-2 border-b-[1.5px] ${
      isActive
        ? "border-black font-medium text-black"
        : "border-transparent text-gray-500"
    }`;
  }

  return (
    <div className="mx-6">
        <nav className="flex items-center justify-between gap-x-16 mt-1.5 mb-4 border-b">
            <div className="flex w-full text-sm">
                <Link
                    to="/dashboard/$cycleId/documents"
                    params={{ cycleId }}
                    search={(prev) => ({ ...prev, status: "UPLOADED", page: 1, limit: prev.limit ?? 10 })}
                    className={tabClass("UPLOADED")}
                >
                    Pending
                </Link>
                <Link
                    to="/dashboard/$cycleId/documents"
                    params={{ cycleId }}
                    search={(prev) => ({ ...prev, status: "ACCEPTED", page: 1, limit: prev.limit ?? 10 })}
                    className={tabClass("ACCEPTED")}
                >
                    Accepted
                </Link>

                <Link
                    to="/dashboard/$cycleId/documents"
                    params={{ cycleId }}
                    search={(prev) => ({ ...prev, status: "REJECTED", page: 1, limit: prev.limit ?? 10 })}
                    className={tabClass("REJECTED")}
                >
                    Rejected
                </Link>
            </div>
        </nav>
    </div>
  );
}