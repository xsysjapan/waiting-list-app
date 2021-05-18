export interface User {
  username: string;
  name: string;
}

// Form
export interface LoginFormValues {
  username: string;
  password: string;
}

// Server
type ErrorCodes = string;
export interface ErrorResponse {
  error: ErrorCodes;
  message: string;
  detail?: string;
}

export type SessionResponse =
  | { succeeded: false }
  | { succeeded: true; user: User };
