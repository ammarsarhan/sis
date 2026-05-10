import type AdmissionCycle from "@/lib/types/AdmissionCycle";
import request from "@/lib/api/base";

export const fetchDashboard = async () => {
    const cycles = await request<Array<AdmissionCycle>>(`api/dashboard`);
    return cycles;
}