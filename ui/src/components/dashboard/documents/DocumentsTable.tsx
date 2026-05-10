import { useMemo, useState } from "react";

import {
    ArrowDownIcon, ArrowUpIcon,
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
import type { ColumnDef, PaginationState, SortingState, VisibilityState } from "@tanstack/react-table";
import { Route } from "@/routes/dashboard/$cycleId/documents";

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

type DocumentStatus = "UPLOADED" | "ACCEPTED" | "REJECTED";
type DocumentType =
    | "PERSONAL_PHOTO" | "NATIONAL_ID" | "BIRTH_CERTIFICATE"
    | "CERTIFICATE" | "TRANSCRIPT" | "OTHER";
type DocumentFormat = "JPEG" | "PNG" | "PDF" | "DOCX" | "OTHER";

interface Document {
    id: string;
    fileName: string;
    fileSize: number;
    fileUrl: string;
    description?: string;
    type: DocumentType;
    format: DocumentFormat;
    status: DocumentStatus;
    acceptedAt?: Date;
    rejectedAt?: Date;
    rejectionReason?: string;
    reviewer?: { id: string; user: { name: string } };
    application: {
        id: string;
        code: string;
        applicant: { nameEn: string };
    };
    createdAt: Date;
    updatedAt: Date;
}

const documents: Array<Document> = [
    {
        id: "doc-1",
        fileName: "national_id_omar.pdf",
        fileSize: 1048576,
        fileUrl: "#",
        type: "NATIONAL_ID",
        format: "PDF",
        status: "ACCEPTED",
        acceptedAt: new Date("2025-02-15T11:00:00"),
        reviewer: { id: "s-1", user: { name: "Ahmed Hassan" } },
        application: { id: "app-1", code: "APP-2025-0001", applicant: { nameEn: "Omar Youssef" } },
        createdAt: new Date("2025-02-14T10:30:00"),
        updatedAt: new Date("2025-02-15T11:00:00"),
    },
    {
        id: "doc-2",
        fileName: "certificate_nour.jpg",
        fileSize: 2097152,
        fileUrl: "#",
        type: "CERTIFICATE",
        format: "JPEG",
        status: "UPLOADED",
        application: { id: "app-2", code: "APP-2025-0002", applicant: { nameEn: "Nour El-Din Kamal" } },
        createdAt: new Date("2025-02-15T09:00:00"),
        updatedAt: new Date("2025-02-15T09:00:00"),
    },
    {
        id: "doc-3",
        fileName: "transcript_layla.pdf",
        fileSize: 524288,
        fileUrl: "#",
        type: "TRANSCRIPT",
        format: "PDF",
        status: "REJECTED",
        rejectedAt: new Date("2025-02-21T14:00:00"),
        rejectionReason: "Document is not legible. Please re-upload a clearer scan.",
        reviewer: { id: "s-2", user: { name: "Sara Mostafa" } },
        application: { id: "app-3", code: "APP-2025-0003", applicant: { nameEn: "Layla Mahmoud" } },
        createdAt: new Date("2025-02-20T11:15:00"),
        updatedAt: new Date("2025-02-21T14:00:00"),
    },
    {
        id: "doc-4",
        fileName: "photo_youssef.png",
        fileSize: 786432,
        fileUrl: "#",
        type: "PERSONAL_PHOTO",
        format: "PNG",
        status: "UPLOADED",
        application: { id: "app-4", code: "APP-2025-0004", applicant: { nameEn: "Youssef Ibrahim" } },
        createdAt: new Date("2025-03-01T08:45:00"),
        updatedAt: new Date("2025-03-01T08:45:00"),
    },
    {
        id: "doc-5",
        fileName: "birth_cert_mariam.pdf",
        fileSize: 314572,
        fileUrl: "#",
        type: "BIRTH_CERTIFICATE",
        format: "PDF",
        status: "ACCEPTED",
        acceptedAt: new Date("2025-03-06T09:30:00"),
        reviewer: { id: "s-1", user: { name: "Ahmed Hassan" } },
        application: { id: "app-5", code: "APP-2025-0005", applicant: { nameEn: "Mariam Samir" } },
        createdAt: new Date("2025-03-05T13:00:00"),
        updatedAt: new Date("2025-03-06T09:30:00"),
    },
];

const DOCUMENT_TYPE_OPTIONS: Array<{ value: DocumentType; label: string }> = [
    { value: "PERSONAL_PHOTO",    label: "Personal Photo" },
    { value: "NATIONAL_ID",       label: "National ID" },
    { value: "BIRTH_CERTIFICATE", label: "Birth Certificate" },
    { value: "CERTIFICATE",       label: "Certificate" },
    { value: "TRANSCRIPT",        label: "Transcript" },
    { value: "OTHER",             label: "Other" },
];

const DOCUMENT_FORMAT_OPTIONS: Array<{ value: DocumentFormat; label: string }> = [
    { value: "JPEG",  label: "JPEG" },
    { value: "PNG",   label: "PNG" },
    { value: "PDF",   label: "PDF" },
    { value: "DOCX",  label: "DOCX" },
    { value: "OTHER", label: "Other" },
];

const LIMIT_OPTIONS = [10, 20, 50, 100];

const statusVariantMap: Record<DocumentStatus, "default" | "secondary" | "destructive" | "outline"> = {
    UPLOADED: "outline",
    ACCEPTED: "default",
    REJECTED: "destructive",
};

function formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
}

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

interface DocumentsTableProps {
    documents?: Array<Document>;
    status?: DocumentStatus;
}

export default function DocumentsTable({ documents: data = documents, status }: DocumentsTableProps) {
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

    const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

    const [filterTypes, setFilterTypes] = useState<Array<string>>([]);
    const [filterFormats, setFilterFormats] = useState<Array<string>>([]);

    const activeFilterCount = [
        filterTypes.length > 0,
        filterFormats.length > 0,
    ].filter(Boolean).length;

    function clearFilters() {
        setFilterTypes([]);
        setFilterFormats([]);
    };

    const filtered = useMemo(() => {
        let rows = status ? data.filter((d) => d.status === status) : data;
        if (filterTypes.length > 0)
        rows = rows.filter((d) => filterTypes.includes(d.type));
        if (filterFormats.length > 0)
        rows = rows.filter((d) => filterFormats.includes(d.format));
        return rows;
    }, [data, status, filterTypes, filterFormats]);

    const pagination: PaginationState = { pageIndex: page - 1, pageSize: limit };

    const columns = useMemo<Array<ColumnDef<Document>>>(
        () => [
        {
            id: "fileName", accessorKey: "fileName",
            header: ({ column }) => <SortableHeader column={column} label="File Name" />,
            cell: ({ getValue }) => (
            <span className="text-[0.8125rem] text-muted-foreground truncate max-w-48 block">
                {getValue() as string}
            </span>
            ),
        },
        {
            id: "applicant", accessorFn: (row) => row.application.applicant.nameEn,
            header: ({ column }) => <SortableHeader column={column} label="Applicant" />,
            cell: ({ getValue, row }) => (
            <div className="flex flex-col">
                <span className="text-[0.8125rem]">{getValue() as string}</span>
                <span className="text-[0.75rem] text-muted-foreground font-mono">
                {row.original.application.code}
                </span>
            </div>
            ),
        },
        {
            id: "type", accessorKey: "type",
            header: "Type",
            cell: ({ getValue }) => (
            <span className="text-[0.8125rem] text-muted-foreground">
                {DOCUMENT_TYPE_OPTIONS.find((opt) => opt.value === getValue() as string)?.label ?? getValue() as string}
            </span>
            ),
        },
        {
            id: "format", accessorKey: "format",
            header: "Format",
            cell: ({ getValue }) => (
            <span className="text-[0.8125rem] text-muted-foreground uppercase">
                {getValue() as string}
            </span>
            ),
        },
        {
            id: "fileSize", accessorKey: "fileSize",
            header: ({ column }) => <SortableHeader column={column} label="Size" />,
            cell: ({ getValue }) => (
            <span className="text-[0.8125rem] text-muted-foreground">
                {formatFileSize(getValue() as number)}
            </span>
            ),
        },
        {
            id: "status", accessorKey: "status",
            header: "Status",
            cell: ({ getValue }) => {
            const value = getValue() as DocumentStatus;
            return (
                <Badge variant={statusVariantMap[value]} className="text-xs px-2 h-6 font-normal">
                {parseType(value)}
                </Badge>
            );
            },
        },
        {
            id: "reviewer", accessorFn: (row) => row.reviewer?.user.name ?? null,
            header: "Reviewer",
            cell: ({ getValue }) => {
            const name = getValue() as string | null;
            return (
                <span className="text-[0.8125rem] text-muted-foreground">
                {name ?? <span className="opacity-40">None</span>}
                </span>
            );
            },
        },
        {
            id: "createdAt", accessorKey: "createdAt",
            header: ({ column }) => <SortableHeader column={column} label="Uploaded" />,
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
            const doc = row.original;
            const canDecide = doc.status === "UPLOADED";
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
                        onClick={() => setSelectedDoc(doc)}
                    >
                        View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="text-[0.8125rem] cursor-pointer"
                        onClick={() => window.open(doc.fileUrl, "_blank")}
                    >
                        Download File
                    </DropdownMenuItem>
                    {canDecide && (
                        <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-[0.8125rem] cursor-pointer">
                            Accept
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            variant="destructive"
                            className="text-[0.8125rem] cursor-pointer"
                        >
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
            const name = row.original.application.applicant.nameEn.toLowerCase();
            const fileName = row.original.fileName.toLowerCase();
            const code = row.original.application.code.toLowerCase();
            const query = (filterValue as string).toLowerCase();
            return name.includes(query) || fileName.includes(query) || code.includes(query);
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
                placeholder="Search by name, file, or code..."
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
                            No documents found.
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
                    <DialogTitle>Filter Documents</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-2">
                    <div className="flex flex-col gap-1.5">
                        <Label className="text-[0.8125rem]">Document Type</Label>
                        <MultiSelect
                            options={DOCUMENT_TYPE_OPTIONS}
                            value={filterTypes}
                            onChange={setFilterTypes}
                            placeholder="All types"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <Label className="text-[0.8125rem]">Format</Label>
                        <MultiSelect
                            options={DOCUMENT_FORMAT_OPTIONS}
                            value={filterFormats}
                            onChange={setFilterFormats}
                            placeholder="All formats"
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

        <Dialog open={!!selectedDoc} onOpenChange={(open) => !open && setSelectedDoc(null)}>
            <DialogContent>
            <DialogHeader>
                <DialogTitle>Document Details</DialogTitle>
            </DialogHeader>
            {selectedDoc && (
                <div className="space-y-3 text-[0.8125rem]">
                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                    <span className="text-muted-foreground">File Name</span>
                    <span className="break-all">{selectedDoc.fileName}</span>

                    <span className="text-muted-foreground">File Size</span>
                    <span>{formatFileSize(selectedDoc.fileSize)}</span>

                    <span className="text-muted-foreground">Format</span>
                    <span className="uppercase">{selectedDoc.format}</span>

                    <span className="text-muted-foreground">Type</span>
                    <span>
                    {DOCUMENT_TYPE_OPTIONS.find((opt) => opt.value === selectedDoc.type)?.label ?? selectedDoc.type}
                    </span>

                    <span className="text-muted-foreground">Status</span>
                    <span>{parseType(selectedDoc.status)}</span>

                    <span className="text-muted-foreground">Application</span>
                    <span className="font-mono">{selectedDoc.application.code}</span>

                    <span className="text-muted-foreground">Applicant</span>
                    <span>{selectedDoc.application.applicant.nameEn}</span>

                    {selectedDoc.reviewer && (
                    <>
                        <span className="text-muted-foreground">Reviewer</span>
                        <span>{selectedDoc.reviewer.user.name}</span>
                    </>
                    )}

                    {selectedDoc.acceptedAt && (
                    <>
                        <span className="text-muted-foreground">Accepted At</span>
                        <span>
                        {selectedDoc.acceptedAt.toLocaleDateString("en-GB", {
                            day: "2-digit", month: "short", year: "numeric",
                        })}
                        </span>
                    </>
                    )}

                    {selectedDoc.rejectedAt && (
                    <>
                        <span className="text-muted-foreground">Rejected At</span>
                        <span>
                        {selectedDoc.rejectedAt.toLocaleDateString("en-GB", {
                            day: "2-digit", month: "short", year: "numeric",
                        })}
                        </span>
                    </>
                    )}

                    {selectedDoc.rejectionReason && (
                    <>
                        <span className="text-muted-foreground">Rejection Reason</span>
                        <span className="text-destructive">{selectedDoc.rejectionReason}</span>
                    </>
                    )}

                    {selectedDoc.description && (
                    <>
                        <span className="text-muted-foreground">Description</span>
                        <span>{selectedDoc.description}</span>
                    </>
                    )}

                    <span className="text-muted-foreground">Uploaded</span>
                    <span>
                    {selectedDoc.createdAt.toLocaleDateString("en-GB", {
                        day: "2-digit", month: "short", year: "numeric",
                    })}
                    </span>
                </div>
                </div>
            )}
            <DialogFooter>
                <Button
                size="sm"
                className="text-[0.8125rem] font-normal!"
                onClick={() => window.open(selectedDoc?.fileUrl, "_blank")}
                >
                    Download File
                </Button>
            </DialogFooter>
            </DialogContent>
        </Dialog>
        </>
    );
}
