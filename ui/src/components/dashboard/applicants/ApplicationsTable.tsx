import { useMemo, useState } from "react";

import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsUpDownIcon,
  MoreHorizontalIcon,
} from "lucide-react";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Link } from "@tanstack/react-router";
import type { ColumnDef, PaginationState, SortingState } from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { parseType } from "@/lib/string";

type ApplicationStatus = "DRAFT" | "SUBMITTED" | "ACCEPTED" | "REJECTED";
type ApplicationChannel = "ONLINE" | "IN_PERSON";

// Matches the shape coming from the applicant object in the parent route —
// no `applicant` field since we already know who this belongs to,
// and `curriculum` / `school` are optional (previous applications may omit them).
export interface Application {
  id: string;
  code: string;
  status: ApplicationStatus;
  channel: ApplicationChannel;
  cycleId: string;
  faculty: { id: string; nameEn: string };
  department: { id: string; nameEn: string };
  grade: number;
  createdAt: Date;
}

interface ApplicationsTableProps {
  applications: Array<Application>;
  /** If provided, only rows whose cycleId matches are shown (useful for filtering to a specific cycle). */
  cycleId?: string;
}

const statusVariantMap: Record<
  ApplicationStatus,
  "default" | "secondary" | "destructive" | "outline"
> = {
  DRAFT: "outline",
  SUBMITTED: "secondary",
  ACCEPTED: "default",
  REJECTED: "destructive",
};

function SortableHeader({ column, label }: { column: any; label: string }) {
  const sorted = column.getIsSorted();
  return (
    <button
      className="flex items-center gap-1.5 hover:text-foreground transition-colors"
      onClick={() => column.toggleSorting(sorted === "asc")}
    >
      {label}
      {sorted === "asc" ? (
        <ArrowUpIcon className="size-3.5" />
      ) : sorted === "desc" ? (
        <ArrowDownIcon className="size-3.5" />
      ) : (
        <ChevronsUpDownIcon className="size-3.5 opacity-40" />
      )}
    </button>
  );
}

export default function ApplicationsTable({
  applications,
  cycleId,
}: ApplicationsTableProps) {
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [sorting, setSorting] = useState<SortingState>([{ id: "createdAt", desc: true }]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const filtered = useMemo(
    () => (cycleId ? applications.filter((a) => a.cycleId === cycleId) : applications),
    [applications, cycleId]
  );

  const columns = useMemo<Array<ColumnDef<Application>>>(
    () => [
      {
        id: "code",
        accessorKey: "code",
        header: ({ column }) => <SortableHeader column={column} label="Code" />,
        cell: ({ getValue }) => (
          <span className="text-[0.8125rem] font-mono text-muted-foreground">
            {getValue() as string}
          </span>
        ),
      },
      {
        id: "cycleId",
        accessorKey: "cycleId",
        header: "Cycle",
        cell: ({ getValue }) => (
          <span className="text-[0.8125rem] text-muted-foreground">{getValue() as string}</span>
        ),
      },
      {
        id: "faculty",
        accessorFn: (row) => row.faculty.nameEn,
        header: "Faculty",
        cell: ({ getValue }) => (
          <span className="text-[0.8125rem] text-muted-foreground">{getValue() as string}</span>
        ),
      },
      {
        id: "department",
        accessorFn: (row) => row.department.nameEn,
        header: "Department",
        cell: ({ getValue }) => (
          <span className="text-[0.8125rem] text-muted-foreground">{getValue() as string}</span>
        ),
      },
      {
        id: "grade",
        accessorKey: "grade",
        header: ({ column }) => <SortableHeader column={column} label="Grade" />,
        cell: ({ getValue }) => (
          <span className="text-[0.8125rem]">{getValue() as number}%</span>
        ),
      },
      {
        id: "channel",
        accessorKey: "channel",
        header: "Channel",
        cell: ({ getValue }) => (
          <span className="text-[0.8125rem] text-muted-foreground">
            {parseType((getValue() as string).replace("_", "-"))}
          </span>
        ),
      },
      {
        id: "status",
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => {
          const value = getValue() as ApplicationStatus;
          return (
            <Badge
              variant={statusVariantMap[value]}
              className="text-xs px-2 h-6 font-normal"
            >
              {parseType(value)}
            </Badge>
          );
        },
      },
      {
        id: "createdAt",
        accessorKey: "createdAt",
        header: ({ column }) => <SortableHeader column={column} label="Submitted" />,
        cell: ({ getValue }) => (
          <span className="text-[0.8125rem]">
            {(getValue() as Date).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: filtered,
    columns,
    state: { sorting, pagination },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const rows = table.getRowModel().rows;
  const totalRows = filtered.length;
  const pageCount = table.getPageCount();
  const from = pagination.pageIndex * pagination.pageSize + 1;
  const to = Math.min(from + pagination.pageSize - 1, totalRows);

  return (
    <>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {rows.length > 0 ? (
            rows.map((row) => (
              <TableRow key={row.id} onClick={() => setSelectedApp(row.original)} className="cursor-pointer">
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="text-center text-[0.8125rem] text-muted-foreground py-8"
              >
                No applications found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* Pagination — only shown when there's more than one page */}
      {pageCount > 1 && (
        <div className="flex items-center justify-between gap-4 mt-4">
          <p className="text-[0.8125rem] text-muted-foreground">
            {totalRows === 0 ? "No results" : `Showing ${from}–${to} of ${totalRows}`}
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeftIcon className="size-3.5" />
            </Button>
            <span className="text-[0.8125rem] text-muted-foreground min-w-16 text-center">
              {pagination.pageIndex + 1} / {pageCount}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRightIcon className="size-3.5" />
            </Button>
          </div>
        </div>
      )}
      {/* Details dialog */}
      <Dialog open={!!selectedApp} onOpenChange={(open) => !open && setSelectedApp(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
          </DialogHeader>
          {selectedApp && (
            <>
              <div className="space-y-3 text-[0.8125rem]">
                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                  <span className="text-muted-foreground">Code</span>
                  <span className="font-mono">{selectedApp.code}</span>
                  <span className="text-muted-foreground">Cycle</span>
                  <span>{selectedApp.cycleId}</span>
                  <span className="text-muted-foreground">Faculty</span>
                  <span>{selectedApp.faculty.nameEn}</span>
                  <span className="text-muted-foreground">Department</span>
                  <span>{selectedApp.department.nameEn}</span>
                  <span className="text-muted-foreground">Grade</span>
                  <span>{selectedApp.grade}%</span>
                  <span className="text-muted-foreground">Channel</span>
                  <span>{parseType(selectedApp.channel.replace("_", "-"))}</span>
                  <span className="text-muted-foreground">Status</span>
                  <Badge
                    variant={statusVariantMap[selectedApp.status]}
                    className="text-xs px-2 h-6 font-normal w-fit"
                  >
                    {parseType(selectedApp.status)}
                  </Badge>
                </div>
              </div>
              <div>
                <Link
                  to="/dashboard/$cycleId/applications/$applicationId"
                  params={{ cycleId: selectedApp.cycleId, applicationId: selectedApp.id }}
                >
                  <Button className="text-[0.8125rem] gap-1.5! font-normal">
                    View Application
                  </Button>
                </Link>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}