import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { parseType } from "@/lib/string";

type AdmissionStaffRole = "OFFICER" | "ADMIN"
type InvitationStatus = "PENDING" | "ACCEPTED" | "EXPIRED"

interface Invitation {
    id: string
    token: string
    intendedRole: AdmissionStaffRole
    email: string
    inviterId: string
    inviter: { id: string; name: string }
    status: InvitationStatus
    createdAt: Date
    updatedAt: Date
}

const invitations: Array<Invitation> = [
    {
        id: "inv-1",
        token: "tok_abc123",
        email: "k.nwosu@uni.edu",
        intendedRole: "OFFICER",
        inviterId: "staff-1",
        inviter: { id: "staff-1", name: "Dr. Sarah Mitchell" },
        status: "PENDING",
        createdAt: new Date("2025-03-01T10:00:00"),
        updatedAt: new Date("2025-03-01T10:00:00"),
    },
    {
        id: "inv-2",
        token: "tok_def456",
        email: "m.ibrahim@uni.edu",
        intendedRole: "ADMIN",
        inviterId: "staff-1",
        inviter: { id: "staff-1", name: "Dr. Sarah Mitchell" },
        status: "ACCEPTED",
        createdAt: new Date("2025-02-15T09:00:00"),
        updatedAt: new Date("2025-02-16T14:30:00"),
    },
    {
        id: "inv-3",
        token: "tok_ghi789",
        email: "t.adeyemi@uni.edu",
        intendedRole: "OFFICER",
        inviterId: "staff-2",
        inviter: { id: "staff-2", name: "Prof. James Okafor" },
        status: "EXPIRED",
        createdAt: new Date("2025-01-20T08:00:00"),
        updatedAt: new Date("2025-01-27T08:00:00"),
    },
    {
        id: "inv-4",
        token: "tok_jkl012",
        email: "r.okonkwo@uni.edu",
        intendedRole: "OFFICER",
        inviterId: "staff-2",
        inviter: { id: "staff-2", name: "Prof. James Okafor" },
        status: "PENDING",
        createdAt: new Date("2025-03-05T11:00:00"),
        updatedAt: new Date("2025-03-05T11:00:00"),
    },
    {
        id: "inv-5",
        token: "tok_mno345",
        email: "b.usman@uni.edu",
        intendedRole: "ADMIN",
        inviterId: "staff-1",
        inviter: { id: "staff-1", name: "Dr. Sarah Mitchell" },
        status: "ACCEPTED",
        createdAt: new Date("2025-02-01T07:30:00"),
        updatedAt: new Date("2025-02-02T09:15:00"),
    },
]

const styles: Record<InvitationStatus, string> = {
    PENDING: "bg-amber-100 text-amber-700",
    ACCEPTED: "bg-green-100 text-green-700",
    EXPIRED: "bg-gray-100 text-gray-500",
}

export default function InvitationsTable({ payload, setPayload } : { payload: string | null, setPayload: (payload: string | null) => void }) {
    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Intended Role</TableHead>
                        <TableHead>Invited By</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Sent On</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        invitations.map((invitation) => (
                            <TableRow key={invitation.id}>
                                <TableCell>{invitation.email}</TableCell>
                                <TableCell>{parseType(invitation.intendedRole)}</TableCell>
                                <TableCell className="text-muted-foreground">{invitation.inviter.name}</TableCell>
                                <TableCell>
                                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${styles[invitation.status]}`}>
                                    {parseType(invitation.status)}
                                </span>
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                    {invitation.createdAt.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            <Dialog open={!!payload} onOpenChange={(open) => !open && setPayload(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Send Invitation</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-y-4.5">
                        <div className="flex flex-col gap-y-1.5">
                            <span>Email Address</span>
                            <Input placeholder="Email Address"/>
                        </div>
                        <div className="flex flex-col gap-y-1.5">
                            <span>Expires At</span>
                            <Select>
                                <SelectTrigger
                                    className="w-full rounded-lg"
                                    aria-label="Expires At"
                                >
                                    <SelectValue placeholder="Expires in" />
                                </SelectTrigger>
                                <SelectContent className="rounded-lg">
                                    <SelectItem value="1d" className="rounded-lg">
                                        In 24 hours
                                    </SelectItem>
                                    <SelectItem value="3d" className="rounded-lg">
                                        In 3 days
                                    </SelectItem>
                                    <SelectItem value="7d" className="rounded-lg">
                                        In 7 days
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col gap-y-1.5">
                            <span>Role</span>
                            <Select>
                                <SelectTrigger
                                    className="w-full rounded-lg"
                                    aria-label="Role"
                                >
                                    <SelectValue placeholder="Role" />
                                </SelectTrigger>
                                <SelectContent className="rounded-lg">
                                    <SelectItem value="OFFICER" className="rounded-lg">
                                        Officer
                                    </SelectItem>
                                    <SelectItem value="ADMIN" className="rounded-lg">
                                        Admin
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <p className="text-gray-500 text-[0.8rem] mt-1">You will be able to define the granular permissions once the user has accepted your invitation.</p>
                        </div>
                        <Button>
                            <span className="font-normal">Send</span>
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}