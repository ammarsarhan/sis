import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";
import { addMonths, isWithinInterval, subMonths, subYears } from "date-fns";
import { Archive, Radio } from "lucide-react";
import { Navigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import type AdmissionCycle from "@/lib/types/AdmissionCycle";
import type { DashboardAdmissionCycle } from "@/lib/types/AdmissionCycle";
import { useAuth } from "@/providers/AuthProvider";
import { fetchDashboard } from "@/lib/api/dashboard";
import Logo from '@/assets/logo.png';

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
    const { user } = useAuth();

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

    if (user && user.isRoot && cycles.length <= 0) {
        return <Navigate to={"/setup"}/>
    };

    if (user && !user.isRoot && cycles.length <= 0) {
        return (
            <div className='w-screen h-screen fixed z-99 flex items-center justify-center'>
                <img src={Logo} className="absolute top-4 left-4 brightness-0 w-10"/>
                <div className='flex flex-col text-center gap-y-2 max-w-1/2'>
                    <h1 className='text-lg font-medium'>No admission cycles for staff account.</h1>
                    <p className='text-gray-400 text-sm'>No admission cycles have been created on the system yet for this user. If you feel like this is a mistake, please get in touch with technical support.</p>
                    <span className="text-gray-400 text-xs block mt-1">ERR: NO_ADMISSION_CYCLES</span>
                </div>
            </div>
        );
    };

    return (
        <DashboardContext.Provider value={{ cycle, setCycle, isLoading, cycles }}>
            {children}
        </DashboardContext.Provider>
    )
};
