import { Request as ExRequest } from "express";
import cookie from "cookie";
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Request,
  Response,
  Route,
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
    this.setHeader("Set-Cookie", `token=${user.id}; Path=/; HttpOnly`);
    return {
      user,
    };
  }

  @Get()
  public async getSession(@Request() req: ExRequest): Promise<SessionResponse> {
    const userId = this.getUserId(req);
    if (!userId) {
      return {};
    }
    const user = await new UsersService().get(userId);
    return {
      user,
    };
  }

  @Delete()
  @SuccessResponse("204", "No Content")
  public async deleteSession(@Request() req: ExRequest): Promise<void> {
    const userId = this.getUserId(req);
    if (!userId) {
      return;
    }
    this.setHeader(
      "Set-Cookie",
      `token=deleted; Path=/; Expires=Thu, Jan 01 1970 00:00:00 UTC`
    );
  }

  getUserId(req: ExRequest) {
    const cookieHeaders = req.headers["cookie"];
    if (!cookieHeaders) {
      return undefined;
    }
    const cookieHeader = Array.isArray(cookieHeaders)
      ? cookieHeaders[0]
      : cookieHeaders;
    if (!cookieHeader) {
      return undefined;
    }
    const cookieValues = cookie.parse(cookieHeader);
    return cookieValues["token"];
  }
}
