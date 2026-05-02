import { useState } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { parseType } from "@/lib/string"

type AdmissionCycleStatus = "DRAFT" | "OPEN" | "CLOSED"
type AdmissionCycleEventDomain = "SETTINGS" | "FACULTIES" | "USERS"

interface AdmissionCycleEvent {
  id: string
  cycleId: string
  previousStatus: AdmissionCycleStatus
  currentStatus: AdmissionCycleStatus
  domain: AdmissionCycleEventDomain
  payload: Record<string, unknown>
  transitionReason?: string
  actorId: string
  actor: { id: string; name: string }
  createdAt: Date
}

const events: Array<AdmissionCycleEvent> = [
  {
    id: "clx001",
    cycleId: "cycle-2025",
    previousStatus: "DRAFT",
    currentStatus: "DRAFT",
    domain: "SETTINGS",
    payload: { name: "2025 Admissions", applicationFee: 100 },
    transitionReason: "Initial setup",
    actorId: "staff-1",
    actor: { id: "staff-1", name: "Dr. Sarah Mitchell" },
    createdAt: new Date("2025-01-10T09:00:00"),
  },
  {
    id: "clx002",
    cycleId: "cycle-2025",
    previousStatus: "DRAFT",
    currentStatus: "DRAFT",
    domain: "FACULTIES",
    payload: { added: ["Engineering", "Medicine"], removed: [] },
    actorId: "staff-2",
    actor: { id: "staff-2", name: "Prof. James Okafor" },
    createdAt: new Date("2025-01-12T11:30:00"),
  },
  {
    id: "clx003",
    cycleId: "cycle-2025",
    previousStatus: "DRAFT",
    currentStatus: "DRAFT",
    domain: "USERS",
    payload: { granted: ["staff-3"], revoked: [] },
    transitionReason: "Added review committee",
    actorId: "staff-1",
    actor: { id: "staff-1", name: "Dr. Sarah Mitchell" },
    createdAt: new Date("2025-01-15T14:00:00"),
  },
  {
    id: "clx004",
    cycleId: "cycle-2025",
    previousStatus: "DRAFT",
    currentStatus: "OPEN",
    domain: "SETTINGS",
    payload: { status: "OPEN" },
    transitionReason: "Approved by registrar",
    actorId: "staff-2",
    actor: { id: "staff-2", name: "Prof. James Okafor" },
    createdAt: new Date("2025-02-01T08:00:00"),
  },
  {
    id: "clx005",
    cycleId: "cycle-2025",
    previousStatus: "OPEN",
    currentStatus: "OPEN",
    domain: "FACULTIES",
    payload: { added: ["Law"], removed: [] },
    actorId: "staff-3",
    actor: { id: "staff-3", name: "Ms. Aisha Bello" },
    createdAt: new Date("2025-02-10T10:15:00"),
  },
  {
    id: "clx006",
    cycleId: "cycle-2025",
    previousStatus: "OPEN",
    currentStatus: "CLOSED",
    domain: "SETTINGS",
    payload: { status: "CLOSED" },
    transitionReason: "Application deadline reached",
    actorId: "staff-1",
    actor: { id: "staff-1", name: "Dr. Sarah Mitchell" },
    createdAt: new Date("2025-04-30T23:59:00"),
  },
]

export default function EventTable() {
  const [payload, setPayload] = useState<Record<string, unknown> | null>(null)

  return (
    <>
      <Table>
        <TableCaption className="py-2 text-[0.8125rem]">Total of <span className="underline">{events.length} actions</span> taken across this cycle.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Timestamp</TableHead>
            <TableHead>Actor</TableHead>
            <TableHead>Domain</TableHead>
            <TableHead>Previous Status</TableHead>
            <TableHead>Updated Status</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                {event.createdAt.toLocaleDateString("en-GB", {
                  day: "2-digit", month: "short", year: "numeric",
                })}{" "}
                {event.createdAt.toLocaleTimeString("en-GB", {
                  hour: "2-digit", minute: "2-digit",
                })}
              </TableCell>
              <TableCell>{event.actor.name}</TableCell>
              <TableCell>{parseType(event.domain)}</TableCell>
              <TableCell>{event.domain === "SETTINGS" ? parseType(event.previousStatus) : "N/A"}</TableCell>
              <TableCell>{event.domain === "SETTINGS" ? parseType(event.currentStatus) : "N/A"}</TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {event.transitionReason ?? "Not provided"}
              </TableCell>
              <TableCell>
                <Button variant="ghost" className="font-normal" size="sm" onClick={() => setPayload(event.payload)}>
                  View payload
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={!!payload} onOpenChange={(open) => !open && setPayload(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Payload</DialogTitle>
            <DialogDescription>Raw data used for diagnosis between events.</DialogDescription>
          </DialogHeader>
          <pre className="rounded-md bg-muted p-4 text-sm overflow-auto">
            {JSON.stringify(payload, null, 2)}
          </pre>
        </DialogContent>
      </Dialog>
    </>
  )
};
