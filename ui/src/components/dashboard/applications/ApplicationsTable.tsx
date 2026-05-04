import { useMemo, useState } from "react";

import {
  ArrowDownIcon, ArrowUpIcon, CheckSquare,
  ChevronLeftIcon, ChevronRightIcon, ChevronsUpDownIcon, ListFilter,
  MoreHorizontalIcon, SlidersHorizontal,
} from "lucide-react";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useNavigate, useSearch } from "@tanstack/react-router";
import type { ColumnDef, PaginationState, RowSelectionState, SortingState, VisibilityState } from "@tanstack/react-table";
import { Route } from "@/routes/dashboard/$cycleId/applications";

import {
  Table, TableBody, TableCell,
  TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

import {
  Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";

import {
  DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/shared/MultiSelect";
import { parseType } from "@/lib/string";

type ApplicationStatus = "DRAFT" | "SUBMITTED" | "ACCEPTED" | "REJECTED";
type ApplicationChannel = "ONLINE" | "IN_PERSON";
type Curriculum =
  | "THANAWIYA_AMMA" | "IGCSE" | "AMERICAN_DIPLOMA"
  | "STEM" | "INTERNATIONAL_BACCALAUREATE" | "ABITUR" | "OTHER";

interface Application {
  id: string;
  code: string;
  status: ApplicationStatus;
  channel: ApplicationChannel;
  applicant: { id: string; nameEn: string; phone: string; nationality: string };
  faculty: { id: string; nameEn: string };
  department: { id: string; nameEn: string };
  curriculum: Curriculum;
  school: string;
  grade: number;
  createdAt: Date;
}

const applications: Array<Application> = [
  {
    id: "app-1", code: "APP-2025-0001", status: "SUBMITTED", channel: "ONLINE",
    applicant: { id: "a-1", nameEn: "Omar Youssef", phone: "+20 100 000 0001", nationality: "EG" },
    faculty: { id: "f-1", nameEn: "Faculty of Engineering" },
    department: { id: "d-1", nameEn: "Computer Science" },
    curriculum: "THANAWIYA_AMMA", school: "Cairo STEM School", grade: 98,
    createdAt: new Date("2025-02-14T10:30:00"),
  },
  {
    id: "app-2", code: "APP-2025-0002", status: "ACCEPTED", channel: "ONLINE",
    applicant: { id: "a-2", nameEn: "Nour El-Din Kamal", phone: "+20 100 000 0002", nationality: "EG" },
    faculty: { id: "f-1", nameEn: "Faculty of Engineering" },
    department: { id: "d-2", nameEn: "Electrical Engineering" },
    curriculum: "IGCSE", school: "British International School", grade: 94,
    createdAt: new Date("2025-02-15T09:00:00"),
  },
  {
    id: "app-3", code: "APP-2025-0003", status: "REJECTED", channel: "IN_PERSON",
    applicant: { id: "a-3", nameEn: "Layla Mahmoud", phone: "+20 100 000 0003", nationality: "US" },
    faculty: { id: "f-2", nameEn: "Faculty of Medicine" },
    department: { id: "d-3", nameEn: "General Medicine" },
    curriculum: "AMERICAN_DIPLOMA", school: "Cairo American College", grade: 87,
    createdAt: new Date("2025-02-20T11:15:00"),
  },
  {
    id: "app-4", code: "APP-2025-0004", status: "DRAFT", channel: "ONLINE",
    applicant: { id: "a-4", nameEn: "Youssef Ibrahim", phone: "+20 100 000 0004", nationality: "EG" },
    faculty: { id: "f-3", nameEn: "Faculty of Commerce" },
    department: { id: "d-4", nameEn: "Business Administration" },
    curriculum: "THANAWIYA_AMMA", school: "Al-Azhar Secondary School", grade: 91,
    createdAt: new Date("2025-03-01T08:45:00"),
  },
  {
    id: "app-5", code: "APP-2025-0005", status: "SUBMITTED", channel: "IN_PERSON",
    applicant: { id: "a-5", nameEn: "Mariam Samir", phone: "+20 100 000 0005", nationality: "GB" },
    faculty: { id: "f-2", nameEn: "Faculty of Medicine" },
    department: { id: "d-5", nameEn: "Pharmacy" },
    curriculum: "STEM", school: "October STEM School", grade: 96,
    createdAt: new Date("2025-03-05T13:00:00"),
  },
];

const CURRICULUM_OPTIONS: Array<{ value: Curriculum; label: string }> = [
  { value: "THANAWIYA_AMMA",              label: "Thanawiya Amma" },
  { value: "IGCSE",                       label: "IGCSE" },
  { value: "AMERICAN_DIPLOMA",            label: "American Diploma" },
  { value: "STEM",                        label: "STEM" },
  { value: "INTERNATIONAL_BACCALAUREATE", label: "International Baccalaureate" },
  { value: "ABITUR",                      label: "Abitur" },
  { value: "OTHER",                       label: "Other" },
];

const NATIONALITY_OPTIONS = (nationalities: Array<string>) =>
  nationalities.map((n) => ({ value: n, label: n }));

const LIMIT_OPTIONS = [10, 20, 50, 100];

const statusVariantMap: Record<ApplicationStatus, "default" | "secondary" | "destructive" | "outline"> = {
  DRAFT: "outline", SUBMITTED: "secondary", ACCEPTED: "default", REJECTED: "destructive",
};

function SortableHeader({ column, label }: { column: any; label: string }) {
  const sorted = column.getIsSorted();
  return (
    <button
      className="flex items-center gap-1.5 hover:text-foreground transition-colors"
      onClick={() => column.toggleSorting(sorted === "asc")}
    >
      {label}
      {sorted === "asc" ? <ArrowUpIcon className="size-3.5" />
        : sorted === "desc" ? <ArrowDownIcon className="size-3.5" />
        : <ChevronsUpDownIcon className="size-3.5 opacity-40" />}
    </button>
  );
}

interface ApplicationsTableProps {
  applications?: Array<Application>;
  status?: ApplicationStatus;
}

export default function ApplicationsTable({ applications: data = applications, status }: ApplicationsTableProps) {
  const navigate = useNavigate({ from: Route.id });
  const search = useSearch({ strict: false });

  const page  = Math.max(1, Number((search as any).page  ?? 1));
  const limit = LIMIT_OPTIONS.includes(Number((search as any).limit))
    ? Number((search as any).limit)
    : 10;

  function setPage(next: number) {
    navigate({ search: (prev) => ({ ...prev, page: next }) });
  }

  function setLimit(next: number) {
    navigate({ search: (prev) => ({ ...prev, limit: next, page: 1 }) });
  }

  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const [filterCurriculums, setFilterCurriculums] = useState<Array<string>>([]);
  const [filterNationalities, setFilterNationalities] = useState<Array<string>>([]);
  const [filterGradeMin, setFilterGradeMin] = useState("");
  const [filterGradeMax, setFilterGradeMax] = useState("");

  const activeFilterCount = [
    filterCurriculums.length > 0,
    filterNationalities.length > 0,
    !!filterGradeMin,
    !!filterGradeMax,
  ].filter(Boolean).length;

  function clearFilters() {
    setFilterCurriculums([]);
    setFilterNationalities([]);
    setFilterGradeMin("");
    setFilterGradeMax("");
  }

  const nationalityOptions = useMemo(
    () => NATIONALITY_OPTIONS([...new Set(data.map((a) => a.applicant.nationality))].sort()),
    [data]
  );

  const filtered = useMemo(() => {
    let rows = status ? data.filter((a) => a.status === status) : data;
    if (filterCurriculums.length > 0)
      rows = rows.filter((a) => filterCurriculums.includes(a.curriculum));
    if (filterNationalities.length > 0)
      rows = rows.filter((a) => filterNationalities.includes(a.applicant.nationality));
    const min = filterGradeMin !== "" ? Number(filterGradeMin) : null;
    const max = filterGradeMax !== "" ? Number(filterGradeMax) : null;
    if (min !== null) rows = rows.filter((a) => a.grade >= min);
    if (max !== null) rows = rows.filter((a) => a.grade <= max);
    return rows;
  }, [data, status, filterCurriculums, filterNationalities, filterGradeMin, filterGradeMax]);

  const pagination: PaginationState = { pageIndex: page - 1, pageSize: limit };

  const selectedIds = Object.keys(rowSelection).filter((k) => rowSelection[k]);
  const selectedRows = filtered.filter((_, i) => rowSelection[i]);
  const bulkAcceptable = selectedRows.filter(
    (a) => a.status !== "ACCEPTED" && a.status !== "REJECTED"
  );

  function handleBulkAccept() {
    console.log("Bulk accepting:", bulkAcceptable.map((a) => a.id));
    setRowSelection({});
  }

  const columns = useMemo<Array<ColumnDef<Application>>>(
    () => [
      {
        id: "select",
        enableHiding: false,
        enableSorting: false,
        header: ({ table }) => (
          <div className="pr-2">
            <Checkbox
              checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() ? "indeterminate" : false)
              }
              onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
              aria-label="Select all"
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="pr-2">
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(v) => row.toggleSelected(!!v)}
              aria-label="Select row"
            />
          </div>
        ),
      },
      {
        id: "code", accessorKey: "code",
        header: ({ column }) => <SortableHeader column={column} label="Code" />,
        cell: ({ getValue }) => (
          <span className="text-[0.8125rem] font-mono text-muted-foreground">{getValue() as string}</span>
        ),
      },
      {
        id: "applicant", accessorFn: (row) => row.applicant.nameEn,
        header: ({ column }) => <SortableHeader column={column} label="Applicant" />,
        cell: ({ getValue }) => (
          <span className="text-[0.8125rem]">{getValue() as string}</span>
        ),
      },
      {
        id: "nationality", accessorFn: (row) => row.applicant.nationality,
        header: "Nationality",
        cell: ({ getValue }) => (
          <span className="text-[0.8125rem] text-muted-foreground">{getValue() as string}</span>
        ),
      },
      {
        id: "faculty", accessorFn: (row) => row.faculty.nameEn,
        header: "Faculty",
        cell: ({ getValue }) => (
          <span className="text-[0.8125rem] text-muted-foreground">{getValue() as string}</span>
        ),
      },
      {
        id: "curriculum", accessorKey: "curriculum",
        header: "Curriculum",
        cell: ({ getValue }) => (
          <span className="text-[0.8125rem] text-muted-foreground">
            {CURRICULUM_OPTIONS.find((opt) => opt.value === getValue() as string)!.label}
          </span>
        ),
      },
      {
        id: "grade", accessorKey: "grade",
        header: ({ column }) => <SortableHeader column={column} label="Grade" />,
        cell: ({ getValue }) => (
          <span className="text-[0.8125rem]">{getValue() as number}%</span>
        ),
      },
      {
        id: "status", accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => {
          const value = getValue() as ApplicationStatus;
          return (
            <Badge variant={statusVariantMap[value]} className="text-xs px-2 h-6 font-normal">
              {parseType(value)}
            </Badge>
          );
        },
      },
      {
        id: "createdAt", accessorKey: "createdAt",
        header: ({ column }) => <SortableHeader column={column} label="Submitted" />,
        cell: ({ getValue }) => (
          <span className="text-[0.8125rem]">
            {(getValue() as Date).toLocaleDateString("en-GB", {
              day: "2-digit", month: "short", year: "numeric",
            })}
          </span>
        ),
      },
      {
        id: "actions", enableHiding: false,
        cell: ({ row }) => {
          const app = row.original;
          const canDecide = app.status !== "ACCEPTED" && app.status !== "REJECTED";
          return (
            <div className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-8">
                    <MoreHorizontalIcon />
                    <span className="sr-only">Actions</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="text-[0.8125rem] cursor-pointer" onClick={() => setSelectedApp(app)}>
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-[0.8125rem] cursor-pointer">
                    Review Documents
                  </DropdownMenuItem>
                  {canDecide && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-[0.8125rem] cursor-pointer">Accept</DropdownMenuItem>
                      <DropdownMenuItem variant="destructive" className="text-[0.8125rem] cursor-pointer">
                        Reject
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data: filtered,
    columns,
    state: { sorting, globalFilter, columnVisibility, rowSelection, pagination },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: (updater) => {
      const next = typeof updater === "function" ? updater(pagination) : updater;
      if (next.pageIndex !== pagination.pageIndex) setPage(next.pageIndex + 1);
      if (next.pageSize !== pagination.pageSize) setLimit(next.pageSize);
    },
    enableRowSelection: true,
    manualPagination: false,
    globalFilterFn: (row, _columnId, filterValue) => {
      const name = row.original.applicant.nameEn.toLowerCase();
      return name.includes((filterValue as string).toLowerCase());
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const rows = table.getRowModel().rows;
  const totalRows = table.getFilteredRowModel().rows.length;
  const pageCount = table.getPageCount();
  const from = pagination.pageIndex * pagination.pageSize + 1;
  const to = Math.min(from + pagination.pageSize - 1, totalRows);

  return (
    <>
      <div className="flex items-center justify-between gap-3 mb-4">
        <Input
          placeholder="Search by name..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="h-8 w-64 text-[0.8125rem]"
        />
        <div className="flex items-center gap-2">
          {selectedIds.length > 0 && status !== "ACCEPTED" && status !== "REJECTED" && (
            <Button
              size="sm"
              className="h-8 text-[0.8125rem] gap-x-1.5 font-normal"
              onClick={handleBulkAccept}
              disabled={bulkAcceptable.length === 0}
            >
              <CheckSquare className="size-3.5" />
              Accept {bulkAcceptable.length} selected
            </Button>
          )}
          <Button
            variant="outline" size="sm"
            className="h-8 text-[0.8125rem] gap-x-1.5 font-normal"
            onClick={() => setFiltersOpen(true)}
          >
            <SlidersHorizontal className="size-3.5" />
            Filters
            {activeFilterCount > 0 && (<> ({activeFilterCount})</>)}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 text-[0.8125rem] gap-x-1.5 font-normal">
                <ListFilter className="size-3.5" />
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48!">
              {table
                .getAllColumns()
                .filter((col) => col.getCanHide())
                .map((col) => (
                  <DropdownMenuCheckboxItem
                    key={col.id}
                    className="text-[0.8125rem] capitalize cursor-pointer"
                    checked={col.getIsVisible()}
                    onCheckedChange={(val) => col.toggleVisibility(val)}
                  >
                    {col.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
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
              <TableRow key={row.id} data-state={row.getIsSelected() ? "selected" : undefined}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center text-[0.8125rem] text-muted-foreground py-8">
                No applications found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between gap-4 mt-4">
        <p className="text-[0.8125rem] text-muted-foreground">
          {totalRows === 0 ? "No results" : `Showing ${from}–${to} of ${totalRows} Total`}
        </p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[0.8125rem] text-muted-foreground">Rows per page</span>
            <Select
              value={String(limit)}
              onValueChange={(v) => setLimit(Number(v))}
            >
              <SelectTrigger className="h-8 w-16 text-[0.8125rem]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {
                  LIMIT_OPTIONS.map((n) => (
                    <SelectItem key={n} value={String(n)} className="text-[0.8125rem]">{n}</SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost" size="icon"
              className="size-8"
              onClick={() => setPage(page - 1)}
              disabled={page <= 1}
            >
              <ChevronLeftIcon className="size-3.5" />
            </Button>
            <span className="text-[0.8125rem] text-muted-foreground min-w-16 text-center">
              {page} / {pageCount || 1}
            </span>
            <Button
              variant="ghost" size="icon"
              className="size-8"
              onClick={() => setPage(page + 1)}
              disabled={page >= pageCount}
            >
              <ChevronRightIcon className="size-3.5" />
            </Button>
          </div>
        </div>
      </div>
      <Dialog open={filtersOpen} onOpenChange={setFiltersOpen}>
        <DialogContent className="w-full!">
          <DialogHeader>
            <DialogTitle>Filter Applications</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="flex flex-col gap-1.5">
              <Label className="text-[0.8125rem]">Curriculum</Label>
              <MultiSelect
                options={CURRICULUM_OPTIONS}
                value={filterCurriculums}
                onChange={setFilterCurriculums}
                placeholder="All curriculums"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-[0.8125rem]">Nationality</Label>
              <MultiSelect
                options={nationalityOptions}
                value={filterNationalities}
                onChange={setFilterNationalities}
                placeholder="All nationalities"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-[0.8125rem]">Grade</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number" min={0} max={100}
                  placeholder="Min"
                  value={filterGradeMin}
                  onChange={(e) => setFilterGradeMin(e.target.value)}
                  className="h-8 text-[0.8125rem]"
                />
                <span className="text-[0.8125rem] text-muted-foreground">–</span>
                <Input
                  type="number" min={0} max={100}
                  placeholder="Max"
                  value={filterGradeMax}
                  onChange={(e) => setFilterGradeMax(e.target.value)}
                  className="h-8 text-[0.8125rem]"
                />
              </div>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-2">
            <Button
              variant="ghost" size="sm"
              className="text-[0.8125rem] font-normal"
              onClick={clearFilters}
              disabled={activeFilterCount === 0}
            >
              Clear all
            </Button>
            <DialogClose asChild>
              <Button size="sm" className="text-[0.8125rem] font-normal!">Done</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={!!selectedApp} onOpenChange={(open) => !open && setSelectedApp(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
          </DialogHeader>
          {selectedApp && (
            <div className="space-y-3 text-[0.8125rem]">
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                <span className="text-muted-foreground">Code</span>
                <span className="font-mono">{selectedApp.code}</span>
                <span className="text-muted-foreground">Applicant</span>
                <span>{selectedApp.applicant.nameEn}</span>
                <span className="text-muted-foreground">Phone</span>
                <span>{selectedApp.applicant.phone}</span>
                <span className="text-muted-foreground">Nationality</span>
                <span className="font-mono">{selectedApp.applicant.nationality}</span>
                <span className="text-muted-foreground">Faculty</span>
                <span>{selectedApp.faculty.nameEn}</span>
                <span className="text-muted-foreground">Department</span>
                <span>{selectedApp.department.nameEn}</span>
                <span className="text-muted-foreground">Curriculum</span>
                <span>{CURRICULUM_OPTIONS.find((opt) => opt.value === selectedApp.curriculum)!.label}</span>
                <span className="text-muted-foreground">School</span>
                <span>{selectedApp.school}</span>
                <span className="text-muted-foreground">Grade</span>
                <span>{selectedApp.grade}%</span>
                <span className="text-muted-foreground">Channel</span>
                <span>{parseType(selectedApp.channel.replace("_", "-"))}</span>
                <span className="text-muted-foreground">Status</span>
                <span>{parseType(selectedApp.status)}</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
