export enum AdmissionCycleStatus {
  DRAFT = "DRAFT",
  OPEN = "OPEN",
  CLOSED = "CLOSED"
};

export default interface AdmissionCycle {
    cycleId: string;
    name: string;
    startDate: Date;
    endDate: Date;
};

export interface DashboardAdmissionCycle {
  id: string;
  name: string;
  logo: React.ComponentType<{ className?: string }>;
  status: string;
}
