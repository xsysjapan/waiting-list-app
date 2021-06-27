export interface CreatedResponse {
  id: string;
}

export interface ErrorResponse {
  code: string;
  message: string;
}

export interface NotFoundResponse extends ErrorResponse {
  code: "NotFound";
  message: "Not Found";
}

export interface ValidationErrorResponse extends ErrorResponse {
  code: "InvalidEntity";
  message: "Validation Failed";
  details: { [name: string]: unknown };
}
