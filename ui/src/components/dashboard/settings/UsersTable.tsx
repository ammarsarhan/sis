import { useState } from "react";
import { MoreHorizontalIcon } from "lucide-react";

import {
  Table,
  TableBody,
  TableCaption,
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

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { parseType } from "@/lib/string";

type AdmissionStaffRole = "OFFICER" | "ADMIN"
type AdmissionCycleEventDomain = "SETTINGS" | "FACULTIES" | "USERS"

interface AdmissionCycleEvent {
    id: string
    domain: AdmissionCycleEventDomain
    createdAt: Date
}

interface Staff {
    id: string
    userId: string
    user: { id: string; name: string; email: string }
    cycleId: string
    role: AdmissionStaffRole
    permissions: Record<string, unknown>
    events: Array<AdmissionCycleEvent>
}

const staff: Array<Staff> = [
    {
        id: "staff-1",
        userId: "user-1",
        user: { id: "user-1", name: "Dr. Sarah Mitchell", email: "s.mitchell@uni.edu" },
        cycleId: "cycle-2025",
        role: "ADMIN",
        permissions: { canOpenCycle: true, canCloseCycle: true, canManageUsers: true, canManageFaculties: true },
        events: [
            { id: "clx001", domain: "SETTINGS", createdAt: new Date("2025-01-10T09:00:00") },
            { id: "clx003", domain: "USERS", createdAt: new Date("2025-01-15T14:00:00") },
            { id: "clx006", domain: "SETTINGS", createdAt: new Date("2025-04-30T23:59:00") },
        ],
    },
    {
        id: "staff-2",
        userId: "user-2",
        user: { id: "user-2", name: "Prof. James Okafor", email: "j.okafor@uni.edu" },
        cycleId: "cycle-2025",
        role: "ADMIN",
        permissions: { canOpenCycle: true, canCloseCycle: false, canManageUsers: false, canManageFaculties: true },
        events: [
            { id: "clx002", domain: "FACULTIES", createdAt: new Date("2025-01-12T11:30:00") },
            { id: "clx004", domain: "SETTINGS", createdAt: new Date("2025-02-01T08:00:00") },
        ],
    },
    {
        id: "staff-3",
        userId: "user-3",
        user: { id: "user-3", name: "Ms. Aisha Bello", email: "a.bello@uni.edu" },
        cycleId: "cycle-2025",
        role: "OFFICER",
        permissions: { canOpenCycle: false, canCloseCycle: false, canManageUsers: false, canManageFaculties: false },
        events: [
            { id: "clx005", domain: "FACULTIES", createdAt: new Date("2025-02-10T10:15:00") },
        ],
    },
    {
        id: "staff-4",
        userId: "user-4",
        user: { id: "user-4", name: "Mr. Chidi Eze", email: "c.eze@uni.edu" },
        cycleId: "cycle-2025",
        role: "OFFICER",
        permissions: { canOpenCycle: false, canCloseCycle: false, canManageUsers: false, canManageFaculties: true },
        events: [],
    },
    {
        id: "staff-5",
        userId: "user-5",
        user: { id: "user-5", name: "Dr. Fatima Al-Hassan", email: "f.alhassan@uni.edu" },
        cycleId: "cycle-2025",
        role: "OFFICER",
        permissions: { canOpenCycle: false, canCloseCycle: false, canManageUsers: false, canManageFaculties: false },
        events: [],
    },
]

function parseLatestAction(events: Array<AdmissionCycleEvent>): string {
    if (events.length === 0) return "No actions yet"
    const latest = events.reduce((a, b) => a.createdAt > b.createdAt ? a : b)
    const date = latest.createdAt.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    return `Updated ${latest.domain.toLowerCase()} on ${date}`
}

export default function UsersTable() {
    const [permissions, setPermissions] = useState<Record<string, unknown> | null>(null)

    return (
        <>
            <Table>
                <TableCaption className="py-2 text-[0.8125rem]">{staff.length} staff members assigned to this cycle.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Latest Action</TableHead>
                            <TableHead />
                        </TableRow>
                    </TableHeader>
                <TableBody>
                {
                    staff.map((member) => (
                        <TableRow key={member.id}>
                            <TableCell>{member.user.name}</TableCell>
                            <TableCell className="text-muted-foreground">{member.user.email}</TableCell>
                            <TableCell>{parseType(member.role)}</TableCell>
                            <TableCell className="text-muted-foreground">{parseLatestAction(member.events)}</TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="size-8">
                                            <MoreHorizontalIcon />
                                            <span className="sr-only">Actions</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem className="text-[0.8125rem] text-nowrap cursor-pointer" onClick={() => setPermissions(member.permissions)}>Edit Permissions</DropdownMenuItem>
                                        <DropdownMenuItem className="text-[0.8125rem] cursor-pointer">View Actions</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem variant="destructive" className="text-[0.8125rem] cursor-pointer">
                                            Remove
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))
                }
                </TableBody>
            </Table>
            <Dialog open={!!permissions} onOpenChange={(open) => !open && setPermissions(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Permissions</DialogTitle>
                    </DialogHeader>
                    <pre className="rounded-md bg-muted p-4 text-sm overflow-auto">
                        {JSON.stringify(permissions, null, 2)}
                    </pre>
                </DialogContent>
            </Dialog>
        </>
    )
}