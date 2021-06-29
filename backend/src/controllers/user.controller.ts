import {
  Body,
  Controller,
  Delete,
  Get,
  Path,
  Post,
  Put,
  Query,
  Response,
  Route,
  SuccessResponse,
} from "tsoa";
import {
  CreatedResponse,
  ErrorResponse,
  NotFoundResponse,
  UserModel,
  ValidationErrorResponse,
} from "../models";
import {
  UsersService,
  UserCreationParams,
  UserModificationParams,
} from "../services/user.service";

@Route("api/users")
export class UsersController extends Controller {
  @Get()
  public async getUsers(@Query("name") name?: string): Promise<UserModel[]> {
    return await new UsersService().search({ name });
  }

  @Get("{id}")
  @Response<NotFoundResponse>(404, "Not Found")
  public async getUser(@Path() id: string): Promise<UserModel> {
    return await new UsersService().get(id);
  }

  @Post()
  @SuccessResponse("201", "Created")
  @Response<ErrorResponse>(400, "Bad Request")
  @Response<ValidationErrorResponse>(422, "Validation Failed")
  public async createUser(
    @Body() requestBody: UserCreationParams
  ): Promise<CreatedResponse> {
    const result = await new UsersService().create(requestBody);
    this.setStatus(201);
    return { id: result.id };
  }

  @Put("{id}")
  @SuccessResponse("204", "No Content")
  @Response<ErrorResponse>(400, "Bad Request")
  @Response<NotFoundResponse>(404, "Not Found")
  @Response<ValidationErrorResponse>(422, "Validation Failed")
  public async putUser(
    @Path() id: string,
    @Body() requestBody: UserModificationParams
  ): Promise<void> {
    await new UsersService().update(id, requestBody);
    this.setStatus(204);
    return;
  }

  @Delete("{id}")
  @SuccessResponse("204", "No Content")
  @Response<ErrorResponse>(400, "Bad Request")
  @Response<NotFoundResponse>(404, "Not Found")
  @Response<ValidationErrorResponse>(422, "Validation Failed")
  public async deleteUser(@Path() id: string): Promise<void> {
    await new UsersService().delete(id);
    this.setStatus(204);
    return;
  }
}
