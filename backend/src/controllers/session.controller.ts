import cookie from "cookie";
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
    this.setHeader("Set-Cookie", `JSESSIONID=${user.id}; Path=/; HttpOnly`);
    return {
      user,
    };
  }

  @Get()
  public async getSession(): Promise<SessionResponse> {
    const userId = this.getUserId();
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
  public async deleteSession(): Promise<void> {
    const userId = this.getUserId();
    if (!userId) {
      return;
    }
    this.setHeader(
      "Set-Cookie",
      `JSESSIONID=deleted; Path=/; Expires=Thu, Jan 01 1970 00:00:00 UTC`
    );
  }

  getUserId() {
    const cookieHeaders = this.getHeader("Cookie");
    if (!cookieHeaders) {
      return undefined;
    }
    const cookieHeader = cookieHeaders[0];
    if (!cookieHeader) {
      return undefined;
    }
    const cookieValues = cookie.parse(cookieHeader);
    return cookieValues["JSESSIONID"];
  }
}
