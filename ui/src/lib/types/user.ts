import type Application from "@/lib/types/application";

export enum AdmissionStaffRole {
    OFFICER = "OFFICER",
    ADMIN = "ADMIN",
};

export enum AdmissionStaffPermissionsDomain {
    SETTINGS = "SETTINGS",
    APPLICATIONS = "APPLICATIONS",
    DOCUMENTS = "DOCUMENTS",
    APPLICANT = "APPLICANT",
    EVENTS = "EVENTS",
    TEAM = "TEAM",
    NOTIFICATIONS = "NOTIFICATIONS",
    FACULTIES = "FACULTIES"
};

export enum AdmissionStaffPermissionsLevel {
    NONE = "NONE",
    READ = "READ",
    WRITE = "WRITE"
};

export type AdmissionStaffPermissions = Record<AdmissionStaffPermissionsDomain, AdmissionStaffPermissionsLevel>;

export default interface User {
    name: string;
    email: string;
    isVerified: string;
    isRoot: boolean;
    staff: Array<{
        cycleId: string;
        role: AdmissionStaffRole;
        permissions: AdmissionStaffPermissions;
    }>;
    applicant?: {
        applications: Array<Application>
    }
};
