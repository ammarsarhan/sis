export enum ApplicationStatus {
    DRAFT = "DRAFT",
    SUBMITTED = "SUBMITTED",
    ACCEPTED = "ACCEPTED",
    REJECTED = "REJECTED"
};

export default interface Application {
    id: string;
    cycleId: string;
    status: ApplicationStatus
};
