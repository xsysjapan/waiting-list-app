export class NotFoundError extends Error {}
export class InvalidOperationError extends Error {
  constructor(public code: string, public message: string) {
    super(message);
  }
}
