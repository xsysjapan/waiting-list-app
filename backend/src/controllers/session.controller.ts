import { v4 as uuid } from "uuid";
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Route,
  SuccessResponse,
} from "tsoa";
import { User } from "../models";

export type SessionCreationParams = {
  username: string;
  password: string;
};

export type SessionResponse = {
  user: User;
};

@Route("api/session")
export class SessionsController extends Controller {
  @SuccessResponse("201", "Created") // Custom success response
  @Post()
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

  @SuccessResponse("200", "OK") // Custom success response
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

  @SuccessResponse("204", "No Content") // Custom success response
  @Delete()
  public async deleteSession(): Promise<void> {}
}
