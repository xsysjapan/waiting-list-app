import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NotFoundError, InvalidOperationError } from "../errors";

export function handlePrismaError(e: any) {
  if (e instanceof PrismaClientKnownRequestError) {
    switch (e.code) {
      case "P2002": {
        throw new InvalidOperationError(
          "UniqueConstraintError",
          "Unique Constraint Error"
        );
      }
      case "P2025": {
        if ((e.meta as any)?.cause === "Record to update not found.") {
          throw new NotFoundError();
        }
        break;
      }
    }
  }
}
