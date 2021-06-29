export class NotFoundError extends Error {}
export class InvalidOperationError extends Error {
  constructor(code: string, message: string) {
    super(message);
  }
}
