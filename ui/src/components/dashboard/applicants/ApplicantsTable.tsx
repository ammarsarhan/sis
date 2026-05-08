import { useMemo, useState } from "react";

import {
    ArrowDownIcon, ArrowUpIcon,
    ChevronLeftIcon, ChevronRightIcon, ChevronsUpDownIcon, ExternalLinkIcon,
    ListFilter, MoreHorizontalIcon, SlidersHorizontal,
} from "lucide-react";

import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import type { ColumnDef, PaginationState, SortingState, VisibilityState } from "@tanstack/react-table";
import { Route } from "@/routes/dashboard/applicants";

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
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/shared/MultiSelect";
import { parseType } from "@/lib/string";

type Gender = "MALE" | "FEMALE";
type ApplicationStatus = "DRAFT" | "SUBMITTED" | "ACCEPTED" | "REJECTED";
type ApplicationChannel = "ONLINE" | "IN_PERSON";
type GuardianRelationship = "FATHER" | "MOTHER" | "GUARDIAN" | "OTHER";

interface ApplicantApplication {
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

interface Guardian {
    id: string;
    name: string;
    phone: string;
    relationship: GuardianRelationship;
    occupation: string;
    description?: string;
    isPrimary: boolean;
}

interface Applicant {
    id: string;
    nameEn: string;
    nameAr: string;
    nationality: string;
    phone: string;
    dateOfBirth: Date;
    gender: Gender;
    nationalId?: string;
    passportNumber?: string;
    cityEn: string;
    governorateEn: string;
    application: ApplicantApplication | null;
    previousApplications: Array<ApplicantApplication>;
    guardians: Array<Guardian>;
    createdAt: Date;
}

const applicants: Array<Applicant> = [
    {
        id: "a-1",
        nameEn: "Omar Youssef",
        nameAr: "عمر يوسف",
        nationality: "EG",
        phone: "+20 100 000 0001",
        dateOfBirth: new Date("2006-04-12"),
        gender: "MALE",
        nationalId: "30604120012345",
        cityEn: "Cairo",
        governorateEn: "Cairo",
        application: {
            id: "app-1", code: "APP-2025-0001", status: "SUBMITTED", channel: "ONLINE",
            cycleId: "cycle-2025",
            faculty: { id: "f-1", nameEn: "Faculty of Engineering" },
            department: { id: "d-1", nameEn: "Computer Science" },
            grade: 98, createdAt: new Date("2025-02-14T10:30:00"),
        },
        previousApplications: [
            {
                id: "app-prev-1", code: "APP-2024-0034", status: "REJECTED", channel: "ONLINE",
                cycleId: "cycle-2024",
                faculty: { id: "f-1", nameEn: "Faculty of Engineering" },
                department: { id: "d-1", nameEn: "Computer Science" },
                grade: 91, createdAt: new Date("2024-02-10T09:00:00"),
            },
        ],
        guardians: [
            { id: "g-1", name: "Youssef Ali", phone: "+20 100 111 0001", relationship: "FATHER", occupation: "Engineer", isPrimary: true },
            { id: "g-2", name: "Hana Youssef", phone: "+20 100 111 0002", relationship: "MOTHER", occupation: "Teacher", isPrimary: false },
        ],
        createdAt: new Date("2025-02-14T10:00:00"),
    },
    {
        id: "a-2",
        nameEn: "Nour El-Din Kamal",
        nameAr: "نور الدين كمال",
        nationality: "EG",
        phone: "+20 100 000 0002",
        dateOfBirth: new Date("2005-11-03"),
        gender: "MALE",
        nationalId: "30511030023456",
        cityEn: "Giza",
        governorateEn: "Giza",
        application: {
            id: "app-2", code: "APP-2025-0002", status: "ACCEPTED", channel: "ONLINE",
            cycleId: "cycle-2025",
            faculty: { id: "f-1", nameEn: "Faculty of Engineering" },
            department: { id: "d-2", nameEn: "Electrical Engineering" },
            grade: 94, createdAt: new Date("2025-02-15T09:00:00"),
        },
        previousApplications: [],
        guardians: [
            { id: "g-3", name: "Kamal Nour", phone: "+20 100 111 0003", relationship: "FATHER", occupation: "Accountant", isPrimary: true },
        ],
        createdAt: new Date("2025-02-15T08:30:00"),
    },
    {
        id: "a-3",
        nameEn: "Layla Mahmoud",
        nameAr: "ليلى محمود",
        nationality: "US",
        phone: "+20 100 000 0003",
        dateOfBirth: new Date("2006-07-22"),
        gender: "FEMALE",
        passportNumber: "US-987654321",
        cityEn: "Alexandria",
        governorateEn: "Alexandria",
        application: {
            id: "app-3", code: "APP-2025-0003", status: "REJECTED", channel: "IN_PERSON",
            cycleId: "cycle-2025",
            faculty: { id: "f-2", nameEn: "Faculty of Medicine" },
            department: { id: "d-3", nameEn: "General Medicine" },
            grade: 87, createdAt: new Date("2025-02-20T11:15:00"),
        },
        previousApplications: [
            {
                id: "app-prev-2", code: "APP-2024-0078", status: "REJECTED", channel: "IN_PERSON",
                cycleId: "cycle-2024",
                faculty: { id: "f-2", nameEn: "Faculty of Medicine" },
                department: { id: "d-3", nameEn: "General Medicine" },
                grade: 82, createdAt: new Date("2024-02-18T10:00:00"),
            },
            {
                id: "app-prev-3", code: "APP-2023-0112", status: "REJECTED", channel: "IN_PERSON",
                cycleId: "cycle-2023",
                faculty: { id: "f-2", nameEn: "Faculty of Medicine" },
                department: { id: "d-3", nameEn: "General Medicine" },
                grade: 79, createdAt: new Date("2023-02-20T10:00:00"),
            },
        ],
        guardians: [
            { id: "g-4", name: "Sarah Johnson", phone: "+1 202 555 0101", relationship: "MOTHER", occupation: "Doctor", isPrimary: true },
            { id: "g-5", name: "Ahmed Mahmoud", phone: "+20 100 111 0005", relationship: "GUARDIAN", occupation: "Lawyer", description: "Uncle", isPrimary: false },
        ],
        createdAt: new Date("2025-02-20T11:00:00"),
    },
    {
        id: "a-4",
        nameEn: "Youssef Ibrahim",
        nameAr: "يوسف إبراهيم",
        nationality: "EG",
        phone: "+20 100 000 0004",
        dateOfBirth: new Date("2006-01-15"),
        gender: "MALE",
        nationalId: "30601150034567",
        cityEn: "Cairo",
        governorateEn: "Cairo",
        application: {
            id: "app-4", code: "APP-2025-0004", status: "DRAFT", channel: "ONLINE",
            cycleId: "cycle-2025",
            faculty: { id: "f-3", nameEn: "Faculty of Commerce" },
            department: { id: "d-4", nameEn: "Business Administration" },
            grade: 91, createdAt: new Date("2025-03-01T08:45:00"),
        },
        previousApplications: [],
        guardians: [
            { id: "g-6", name: "Ibrahim Hassan", phone: "+20 100 111 0006", relationship: "FATHER", occupation: "Business Owner", isPrimary: true },
        ],
        createdAt: new Date("2025-03-01T08:30:00"),
    },
    {
        id: "a-5",
        nameEn: "Mariam Samir",
        nameAr: "مريم سامر",
        nationality: "GB",
        phone: "+20 100 000 0005",
        dateOfBirth: new Date("2005-09-08"),
        gender: "FEMALE",
        passportNumber: "GB-112233445",
        cityEn: "October City",
        governorateEn: "Giza",
        application: {
            id: "app-5", code: "APP-2025-0005", status: "SUBMITTED", channel: "IN_PERSON",
            cycleId: "cycle-2025",
            faculty: { id: "f-2", nameEn: "Faculty of Medicine" },
            department: { id: "d-5", nameEn: "Pharmacy" },
            grade: 96, createdAt: new Date("2025-03-05T13:00:00"),
        },
        previousApplications: [],
        guardians: [
            { id: "g-7", name: "Samir Adel", phone: "+44 7700 900123", relationship: "FATHER", occupation: "Pilot", isPrimary: true },
            { id: "g-8", name: "Claire Samir", phone: "+44 7700 900124", relationship: "MOTHER", occupation: "Nurse", isPrimary: false },
        ],
        createdAt: new Date("2025-03-05T12:45:00"),
    },
    {
        id: "a-6",
        nameEn: "Sara Tarek",
        nameAr: "سارة طارق",
        nationality: "EG",
        phone: "+20 100 000 0006",
        dateOfBirth: new Date("2006-03-30"),
        gender: "FEMALE",
        nationalId: "30603300056789",
        cityEn: "Mansoura",
        governorateEn: "Dakahlia",
        application: null,
        previousApplications: [
            {
                id: "app-prev-4", code: "APP-2024-0201", status: "REJECTED", channel: "ONLINE",
                cycleId: "cycle-2024",
                faculty: { id: "f-3", nameEn: "Faculty of Commerce" },
                department: { id: "d-4", nameEn: "Business Administration" },
                grade: 88, createdAt: new Date("2024-03-08T10:00:00"),
            },
        ],
        guardians: [
            { id: "g-9", name: "Tarek Saeed", phone: "+20 100 111 0009", relationship: "FATHER", occupation: "Pharmacist", isPrimary: true },
        ],
        createdAt: new Date("2025-03-10T10:00:00"),
    },
];

const NATIONALITY_OPTIONS = (nationalities: Array<string>) =>
    nationalities.map((n) => ({ value: n, label: n }));

const GENDER_OPTIONS: Array<{ value: Gender; label: string }> = [
    { value: "MALE",   label: "Male" },
    { value: "FEMALE", label: "Female" },
];

const APPLICATION_STATUS_OPTIONS: Array<{ value: ApplicationStatus; label: string }> = [
    { value: "DRAFT",     label: "Draft" },
    { value: "SUBMITTED", label: "Submitted" },
    { value: "ACCEPTED",  label: "Accepted" },
    { value: "REJECTED",  label: "Rejected" },
];

const LIMIT_OPTIONS = [10, 20, 50, 100];

const appStatusVariantMap: Record<ApplicationStatus, "default" | "secondary" | "destructive" | "outline"> = {
    DRAFT:     "outline",
    SUBMITTED: "secondary",
    ACCEPTED:  "default",
    REJECTED:  "destructive",
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

interface ApplicantsTableProps {
    applicants?: Array<Applicant>;
    cycleId: string;
}

export default function ApplicantsTable({ applicants: data = applicants, cycleId }: ApplicantsTableProps) {
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

    const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

    const [filterNationalities, setFilterNationalities] = useState<Array<string>>([]);
    const [filterGenders, setFilterGenders] = useState<Array<string>>([]);
    const [filterAppStatuses, setFilterAppStatuses] = useState<Array<string>>([]);

    const activeFilterCount = [
        filterNationalities.length > 0,
        filterGenders.length > 0,
        filterAppStatuses.length > 0,
    ].filter(Boolean).length;

    function clearFilters() {
        setFilterNationalities([]);
        setFilterGenders([]);
        setFilterAppStatuses([]);
    }

    const nationalityOptions = useMemo(
        () => NATIONALITY_OPTIONS([...new Set(data.map((a) => a.nationality))].sort()),
        [data]
    );

    const filtered = useMemo(() => {
        let rows = data;

        if (filterNationalities.length > 0)
            rows = rows.filter((a) => filterNationalities.includes(a.nationality));

        if (filterGenders.length > 0)
            rows = rows.filter((a) => filterGenders.includes(a.gender));

        if (filterAppStatuses.length > 0) {
            rows = rows.filter((a) =>
                a.application
                ? filterAppStatuses.includes(a.application.status)
                : filterAppStatuses.includes("NONE")
            );
        }

        return rows;
    }, [data, filterNationalities, filterGenders, filterAppStatuses]);

    const pagination: PaginationState = { pageIndex: page - 1, pageSize: limit };

    const columns = useMemo<Array<ColumnDef<Applicant>>>(
        () => [
        {
            id: "name", accessorKey: "nameEn",
            header: ({ column }) => <SortableHeader column={column} label="Applicant" />,
            cell: ({ getValue }) => (
                <div className="flex flex-col gap-0.5">
                    <span className="text-[0.8125rem]">{getValue() as string}</span>
                </div>
            ),
        },
        {
            id: "nationality", accessorKey: "nationality",
            header: "Nationality",
            cell: ({ getValue }) => (
                <span className="text-[0.8125rem] text-muted-foreground">{getValue() as string}</span>
            ),
        },
        {
            id: "phone", accessorKey: "phone",
            header: "Phone",
            cell: ({ getValue }) => (
                <span className="text-[0.8125rem] text-muted-foreground">{getValue() as string}</span>
            ),
        },
        {
            id: "gender", accessorKey: "gender",
            header: "Gender",
            cell: ({ getValue }) => (
                <span className="text-[0.8125rem] text-muted-foreground">
                    {parseType(getValue() as string)}
                </span>
            ),
        },
        {
            id: "application",
            accessorFn: (row) => row.application?.code ?? null,
            header: "Application",
            cell: ({ row }) => {
                const app = row.original.application;

                return (
                    <div className="flex flex-col gap-1">
                        {app ? (
                            <div className="flex items-center gap-2">
                                <Link
                                    to="/dashboard/$cycleId/applications/$applicationId"
                                    params={{ cycleId, applicationId: app.id }}
                                    className="inline-flex items-center gap-1.5 group"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <span className="text-[0.8125rem] font-mono text-muted-foreground group-hover:text-foreground transition-colors">
                                        {app.code}
                                    </span>
                                    <ExternalLinkIcon className="size-3 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" />
                                </Link>
                            </div>
                        ) : (
                            <span className="text-[0.8125rem] text-muted-foreground/50">No application</span>
                        )}
                    </div>
                );
            },
        },
        {
            id: "faculty",
            accessorFn: (row) => row.application?.faculty.nameEn ?? null,
            header: "Faculty",
            cell: ({ getValue }) => {
                const val = getValue() as string | null;
                return val
                    ? <span className="text-[0.8125rem] text-muted-foreground">{val}</span>
                    : <span className="text-[0.8125rem] text-muted-foreground/40">N/A</span>;
                },
        },
        {
            id: "grade",
            accessorFn: (row) => row.application?.grade ?? null,
            header: ({ column }) => <SortableHeader column={column} label="Grade" />,
            cell: ({ getValue }) => {
                const val = getValue() as number | null;
                return val !== null
                    ? <span className="text-[0.8125rem]">{val}%</span>
                    : <span className="text-[0.8125rem] text-muted-foreground/40">N/A</span>;
                },
        },
        {
            id: "createdAt", accessorKey: "createdAt",
            header: ({ column }) => <SortableHeader column={column} label="Registered" />,
            cell: ({ getValue }) => (
                <span className="text-[0.8125rem]">
                    {
                        (getValue() as Date).toLocaleDateString("en-GB", {
                            day: "2-digit", month: "short", year: "numeric",
                        })
                    }
                </span>
            ),
        },
        {
            id: "actions", enableHiding: false,
            cell: ({ row }) => {
                const applicant = row.original;

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
                                <DropdownMenuItem
                                    className="text-[0.8125rem] cursor-pointer"
                                    onClick={() => setSelectedApplicant(applicant)}
                                >
                                    View Details
                                </DropdownMenuItem>
                                {
                                    applicant.previousApplications.length > 0 && (
                                        <>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-[0.8125rem] cursor-pointer" asChild>
                                                <Link
                                                    to="/dashboard/applicants/$applicantId"
                                                    hash="applications"
                                                    params={{ applicantId: applicant.id }}
                                                >
                                                    All Applications
                                                </Link>
                                            </DropdownMenuItem>
                                        </>
                                    )
                                }
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                );
            },
        },
        ], [cycleId]
    );

    const table = useReactTable({
        data: filtered,
        columns,
        state: { sorting, globalFilter, columnVisibility, pagination },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        onColumnVisibilityChange: setColumnVisibility,
        onPaginationChange: (updater) => {
            const next = typeof updater === "function" ? updater(pagination) : updater;
            if (next.pageIndex !== pagination.pageIndex) setPage(next.pageIndex + 1);
            if (next.pageSize !== pagination.pageSize) setLimit(next.pageSize);
        },
        manualPagination: false,
        globalFilterFn: (row, _columnId, filterValue) => {
            const query = (filterValue as string).toLowerCase();
            const name = row.original.nameEn.toLowerCase();
            const phone = row.original.phone.toLowerCase();
            const code = row.original.application?.code.toLowerCase() ?? "";
            return name.includes(query) || phone.includes(query) || code.includes(query);
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

    const guardian = selectedApplicant?.guardians.find((g) => g.isPrimary)
        ?? selectedApplicant?.guardians[0]
        ?? null;

    return (
        <>
            <div className="flex items-center justify-between gap-3 mb-4">
                <Input
                    placeholder="Search by name, phone, or code..."
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    className="h-8 w-72 text-[0.8125rem]"
                />
                <div className="flex items-center gap-2">
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
                        {
                            table
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
                                ))
                        }
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <Table>
                <TableHeader>
                {
                    table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                        {
                            headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))
                        }
                        </TableRow>
                    ))
                }
                </TableHeader>
                <TableBody>
                {
                    rows.length > 0 ? (
                        rows.map((row) => (
                            <TableRow key={row.id}>
                                {
                                    row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                        ))
                                }
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="text-center text-[0.8125rem] text-muted-foreground py-8">
                                No applicants found.
                            </TableCell>
                        </TableRow>
                    )
                }
                </TableBody>
            </Table>
            <div className="flex items-center justify-between gap-4 mt-4">
                <p className="text-[0.8125rem] text-muted-foreground">
                {totalRows === 0 ? "No results" : `Showing ${from}–${to} of ${totalRows} Total`}
                </p>
                <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <span className="text-[0.8125rem] text-muted-foreground">Rows per page</span>
                    <Select value={String(limit)} onValueChange={(v) => setLimit(Number(v))}>
                    <SelectTrigger className="h-8 w-16 text-[0.8125rem]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {LIMIT_OPTIONS.map((n) => (
                        <SelectItem key={n} value={String(n)} className="text-[0.8125rem]">{n}</SelectItem>
                        ))}
                    </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center gap-1">
                    <Button
                    variant="ghost" size="icon" className="size-8"
                    onClick={() => setPage(page - 1)}
                    disabled={page <= 1}
                    >
                    <ChevronLeftIcon className="size-3.5" />
                    </Button>
                    <span className="text-[0.8125rem] text-muted-foreground min-w-16 text-center">
                    {page} / {pageCount || 1}
                    </span>
                    <Button
                    variant="ghost" size="icon" className="size-8"
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
                    <DialogTitle>Filter Applicants</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-2">
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
                    <Label className="text-[0.8125rem]">Gender</Label>
                    <MultiSelect
                        options={GENDER_OPTIONS}
                        value={filterGenders}
                        onChange={setFilterGenders}
                        placeholder="All genders"
                    />
                    </div>
                    <div className="flex flex-col gap-1.5">
                    <Label className="text-[0.8125rem]">Application Status</Label>
                    <MultiSelect
                        options={APPLICATION_STATUS_OPTIONS}
                        value={filterAppStatuses}
                        onChange={setFilterAppStatuses}
                        placeholder="All statuses"
                    />
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
            <Dialog open={!!selectedApplicant} onOpenChange={(open) => !open && setSelectedApplicant(null)}>
                <DialogContent>
                <DialogHeader>
                    <DialogTitle>Applicant Details</DialogTitle>
                </DialogHeader>
                    {
                        selectedApplicant && (
                            <div className="space-y-4 text-[0.8125rem]">
                                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                                    <span className="text-muted-foreground">Name</span>
                                    <span>{selectedApplicant.nameEn}</span>
                                    <span className="text-muted-foreground">الإسم</span>
                                    <span dir="rtl">{selectedApplicant.nameAr}</span>
                                    <span className="text-muted-foreground">Nationality</span>
                                    <span>{selectedApplicant.nationality}</span>
                                    <span className="text-muted-foreground">Gender</span>
                                    <span>{parseType(selectedApplicant.gender)}</span>
                                    <span className="text-muted-foreground">Date of Birth</span>
                                    <span>
                                        {
                                            selectedApplicant.dateOfBirth.toLocaleDateString("en-GB", {
                                                day: "2-digit", month: "short", year: "numeric",
                                            })
                                        }
                                    </span>
                                    <span className="text-muted-foreground">Phone</span>
                                    <span>{selectedApplicant.phone}</span>
                                    {
                                        selectedApplicant.nationalId && (
                                        <>
                                            <span className="text-muted-foreground">National ID</span>
                                            <span>{selectedApplicant.nationalId}</span>
                                        </>
                                        )
                                    }
                                    {
                                        selectedApplicant.passportNumber && (
                                        <>
                                            <span className="text-muted-foreground">Passport No.</span>
                                            <span>{selectedApplicant.passportNumber}</span>
                                        </>
                                        )
                                    }
                                    <span className="text-muted-foreground">City</span>
                                    <span>{selectedApplicant.cityEn}, {selectedApplicant.governorateEn}</span>
                                </div>
                                <div className="border-t pt-4 space-y-3">
                                    <p className="font-medium tracking-wide">Primary Guardian</p>
                                    {selectedApplicant.guardians.length === 0 ? (
                                        <p className="text-[0.8125rem] text-muted-foreground/60">
                                            No guardians on record.
                                        </p>
                                    ) : (
                                        <div className="space-y-3">
                                            {guardian && (
                                                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                                                    <span className="text-muted-foreground">Name</span>
                                                    <div className="flex items-center gap-1.5">
                                                        <span>{guardian.name}</span>
                                                    </div>
                                                    <span className="text-muted-foreground">Relationship</span>
                                                    <span>{parseType(guardian.relationship)}</span>
                                                    <span className="text-muted-foreground">Phone</span>
                                                    <span>{guardian.phone}</span>
                                                    <span className="text-muted-foreground">Occupation</span>
                                                    <span>{guardian.occupation}</span>
                                                    {guardian.description && (
                                                        <>
                                                            <span className="text-muted-foreground">Note</span>
                                                            <span>{guardian.description}</span>
                                                        </>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <div className="border-t pt-4">
                                    <p className="font-medium tracking-wide">Application</p>
                                    {
                                        selectedApplicant.application ? (
                                            <div className="grid grid-cols-2 gap-x-4 gap-y-3 mt-4">
                                                <span className="text-muted-foreground">Code</span>
                                                <Link
                                                    to="/dashboard/$cycleId/applications/$applicationId"
                                                    params={{ cycleId, applicationId: selectedApplicant.application.id }}
                                                    className="inline-flex items-center gap-1.5 group"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <span className="text-[0.75rem] font-mono text-muted-foreground group-hover:text-foreground transition-colors">
                                                        {selectedApplicant.application.code}
                                                    </span>
                                                    <ExternalLinkIcon className="size-3 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" />
                                                </Link>
                                                <span className="text-muted-foreground">Status</span>
                                                <Badge
                                                    variant={appStatusVariantMap[selectedApplicant.application.status]}
                                                    className="text-xs px-2 h-5 font-normal w-fit"
                                                >
                                                    {parseType(selectedApplicant.application.status)}
                                                </Badge>
                                                <span className="text-muted-foreground">Channel</span>
                                                <span>{parseType(selectedApplicant.application.channel.replace("_", "-"))}</span>
                                                <span className="text-muted-foreground">Faculty</span>
                                                <span>{selectedApplicant.application.faculty.nameEn}</span>
                                                <span className="text-muted-foreground">Department</span>
                                                <span>{selectedApplicant.application.department.nameEn}</span>
                                                <span className="text-muted-foreground">Grade</span>
                                                <span>{selectedApplicant.application.grade}%</span>
                                                <span className="text-muted-foreground">Submitted</span>
                                                <span>
                                                {
                                                    selectedApplicant.application.createdAt.toLocaleDateString("en-GB", {
                                                        day: "2-digit", month: "short", year: "numeric",
                                                    })
                                                }
                                                </span>
                                            </div>
                                            ) : (
                                            <p className="text-[0.8125rem] text-muted-foreground/60 mt-1">
                                                This applicant has not submitted an application for this cycle.
                                            </p>
                                            )
                                    }
                                    {
                                        selectedApplicant.previousApplications.length > 0 && (
                                            <div className="mt-4 pt-3 border-t">
                                                <Link
                                                    to="/dashboard/applicants/$applicantId"
                                                    hash="applications"
                                                    params={{ applicantId: selectedApplicant.id }}
                                                    className="inline-flex items-center gap-1.5 group"
                                                    onClick={() => setSelectedApplicant(null)}
                                                >
                                                    <span className="text-[0.8125rem] text-muted-foreground group-hover:text-foreground transition-colors">
                                                        {selectedApplicant.previousApplications.length} previous application{selectedApplicant.previousApplications.length !== 1 ? "s" : ""} from prior cycles
                                                    </span>
                                                    <ExternalLinkIcon className="size-3 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" />
                                                </Link>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        )
                    }
                    {
                        selectedApplicant?.application && (
                            <DialogFooter className="mt-2">
                                <Button className="text-[0.8125rem] font-normal! px-3.5 py-3" asChild>
                                    <Link
                                        to="/dashboard/$cycleId/applications/$applicationId"
                                        params={{ cycleId: "cycle-id", applicationId: selectedApplicant.application.id }}
                                        onClick={() => setSelectedApplicant(null)}
                                    >
                                        Open Application
                                    </Link>
                                </Button>
                            </DialogFooter>
                        )
                    }
                </DialogContent>
            </Dialog>
        </>
    );
}
