import {
  Body,
  Controller,
  Delete,
  Get,
  Path,
  Post,
  Put,
  Query,
  Route,
  SuccessResponse,
} from "tsoa";
import { User } from "../models";
import {
  UsersService,
  UserCreationParams,
  UserModificationParams,
} from "../services/user.service";

@Route("api/users")
export class UsersController extends Controller {
  @Get()
  public async getUsers(@Query("name") name: string): Promise<User[]> {
    return new UsersService().search({ name });
  }

  @Get("{id}")
  public async getUser(@Path() id: string): Promise<User> {
    return new UsersService().get(id);
  }

  @SuccessResponse("201", "Created") // Custom success response
  @Post()
  public async createUser(
    @Body() requestBody: UserCreationParams
  ): Promise<{ id: string }> {
    const result = new UsersService().create(requestBody);
    this.setStatus(201); // set return status 201
    return { id: result.id };
  }

  @SuccessResponse("204", "No Content") // Custom success response
  @Put("{id}")
  public async putUser(
    @Path() id: string,
    @Body() requestBody: UserModificationParams
  ): Promise<void> {
    new UsersService().update(id, requestBody);
    this.setStatus(204); // set return status 204
    return;
  }

  @SuccessResponse("204", "No Content") // Custom success response
  @Delete("{id}")
  public async deleteUser(@Path() id: string): Promise<void> {
    new UsersService().delete(id);
    this.setStatus(204); // set return status 204
    return;
  }
}
