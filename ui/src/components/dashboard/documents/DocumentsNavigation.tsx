import { Link, useSearch } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Route } from "@/routes/dashboard/$cycleId/documents";
import { Button } from "@/components/ui/button";

export default function DocumentsNavigation({ cycleId }: { cycleId: string }) {
  const search = useSearch({ from: Route.id });

  const currentStatus = search.status;

  function tabClass(targetStatus: string) {
    const isActive = currentStatus === targetStatus;

    return `px-4 pt-2 pb-3.5 border-b-[1.5px] ${
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
            <Link to={"/dashboard/$cycleId/documents/review"} params={{ cycleId: "cycle-id" }}>
                <Button className="font-normal mb-2 px-3">
                    <span className="text-[0.8125rem] font-normal">View Per-document</span>
                    <ArrowRight className="size-4" />
                </Button>
            </Link>
        </nav>
    </div>
  );
}