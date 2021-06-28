import { v4 as uuid } from "uuid";
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Response,
  Route,
  SuccessResponse,
} from "tsoa";
import { ErrorResponse, UserModel, ValidationErrorResponse } from "../models";

export type SessionCreationParams = {
  username: string;
  password: string;
};

export type SessionResponse = {
  user?: UserModel;
};

@Route("api/session")
export class SessionsController extends Controller {
  @Post()
  @SuccessResponse("201", "Created")
  @Response<ErrorResponse>(400, "Bad Request")
  @Response<ValidationErrorResponse>(422, "Validation Failed")
  public async createSession(
    @Body() requestBody: SessionCreationParams
  ): Promise<SessionResponse> {
    return {
      user: {
        id: uuid(),
        username: "username",
        name: "Name",
      },
    };
  }

  @Get()
  public async getSession(): Promise<SessionResponse> {
    return {
      user: {
        id: uuid(),
        username: "username",
        name: "Name",
      },
    };
  }

  @Delete()
  @SuccessResponse("204", "No Content")
  public async deleteSession(): Promise<void> {}
}
