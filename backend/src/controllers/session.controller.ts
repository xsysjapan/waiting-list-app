import { Request as ExRequest } from "express";
import * as cookie from "cookie";
import * as jwt from "jsonwebtoken";
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Request,
  Response,
  Route,
  Security,
  SuccessResponse,
} from "tsoa";
import { ErrorResponse, UserModel, ValidationErrorResponse } from "../models";
import { SessionCreationParams, UsersService } from "../services/user.service";

export type SessionResponse = {
  user?: UserModel;
};

@Route("api/session")
export class SessionsController extends Controller {
  @Post()
  @Response<ErrorResponse>(400, "Bad Request")
  @Response<ValidationErrorResponse>(422, "Validation Failed")
  public async createSession(
    @Body() requestBody: SessionCreationParams
  ): Promise<SessionResponse> {
    const user = await new UsersService().login(requestBody);
    const token = jwt.sign(JSON.stringify(user), "[secret]");
    this.setHeader("Set-Cookie", `token=${token}; Path=/; HttpOnly`);
    return {
      user,
    };
  }

  @Get()
  @Security("cookieAuth")
  public async getSession(
    @Request() req: ExRequest & { user: UserModel }
  ): Promise<SessionResponse> {
    return Promise.resolve({ user: req.user });
  }

  @Delete()
  @SuccessResponse("204", "No Content")
  @Security("cookieAuth")
  public async deleteSession(): Promise<void> {
    this.setHeader(
      "Set-Cookie",
      `token=deleted; Path=/; Expires=Thu, Jan 01 1970 00:00:00 UTC`
    );
  }
}
