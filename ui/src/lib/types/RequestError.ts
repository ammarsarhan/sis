export const ERROR_CODES = {
    VALIDATION_FAILED: "VALIDATION_FAILED",
    UNAUTHORIZED: "UNAUTHORIZED",
    ACCESS_FORBIDDEN: "ACCESS_FORBIDDEN",
    INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

export default class RequestError extends Error {
    success: false;
    code: ErrorCode;

    constructor(message: string, code: ErrorCode) {
        super(message);

        this.success = false;
        this.code = code;
    }
};
