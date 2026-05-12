import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";
import { addMonths, isWithinInterval, subMonths, subYears } from "date-fns";
import { Archive, Radio } from "lucide-react";
import type { ReactNode } from "react";
import type AdmissionCycle from "@/lib/types/AdmissionCycle";
import type { DashboardAdmissionCycle } from "@/lib/types/AdmissionCycle";
import { fetchDashboard } from "@/lib/api/dashboard";

export interface DashboardContextType {
    isLoading: boolean;
    cycles: Array<DashboardAdmissionCycle>;
    cycle: DashboardAdmissionCycle;
    setCycle: (cycle: DashboardAdmissionCycle) => void;
};

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function useDashboard() {
    const context = useContext(DashboardContext);

    if (!context) {
        throw new Error("useDashboard must be used within DashboardProvider");
    }

    return context;
};

// Mock data to be replaced when data is fetched from the backend.
const data: Array<AdmissionCycle> = [
    {
        cycleId: "some-random-cycle-id-1",
        name: "Fall 2026",
        startDate: subMonths(new Date(), 2),
        endDate: addMonths(new Date(), 3)
    },
    {
        cycleId: "some-random-cycle-id-2",
        name: "Spring 2025",
        startDate: subYears(new Date(), 1.5),
        endDate: subYears(new Date(), 1)
    },
    {
        cycleId: "some-random-cycle-id-3",
        name: "Fall 2025",
        startDate: subYears(new Date(), 2),
        endDate: subYears(new Date(), 1.75)
    },
];

const parseCycles = (cycles: Array<AdmissionCycle>): Array<DashboardAdmissionCycle> => {
    return cycles.map(cycle => {
        const isActive = isWithinInterval(new Date(), { start: cycle.startDate, end: cycle.endDate });

        return {
            id: cycle.cycleId,
            name: cycle.name,
            logo: isActive ? Radio : Archive,
            status: isActive ? "Live" : "Archived"
        }
    })
};

export default function DashboardProvider({ children }: { children: ReactNode }) {
    const cycles = parseCycles(data);
    const [cycle, setCycle] = useState<DashboardAdmissionCycle>(cycles[0]);

    // Todo: Uncomment this when the API returns data properly.
    const { 
        // data,
        // error,
        isLoading 
    } = useQuery({
        queryKey: ["dashboard"],
        queryFn: fetchDashboard,
        retry: false,
        staleTime: 1000 * 60 * 5,
    });

    // const cycles = error ? null : data ?? null;

    return (
        <DashboardContext.Provider value={{ cycle, setCycle, isLoading, cycles }}>
            {children}
        </DashboardContext.Provider>
    )
};
