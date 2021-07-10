import {
  Body,
  Controller,
  Delete,
  Get,
  Path,
  Put,
  Query,
  Response,
  Route,
  SuccessResponse,
} from "tsoa";
import {
  ConfigurationModel,
  ErrorResponse,
  NotFoundResponse,
  ValidationErrorResponse,
} from "../models";
import {
  ConfigurationsService,
  ConfigurationModificationParams,
} from "../services/configuration.service";

@Route("api/configurations")
export class ConfigurationsController extends Controller {
  @Get()
  public async getConfigurations(
    @Query("key") key?: string
  ): Promise<ConfigurationModel[]> {
    return new ConfigurationsService().search({ key });
  }

  @Put()
  @SuccessResponse("204", "No Content")
  @Response<ErrorResponse>(400, "Bad Request")
  @Response<NotFoundResponse>(404, "Not Found")
  @Response<ValidationErrorResponse>(422, "Validation Failed")
  public async putConfigurations(
    @Body() requestBody: ConfigurationModel[]
  ): Promise<void> {
      return new ConfigurationsService().batchUpdate(requestBody);
  }

  @Get("{key}")
  @Response<NotFoundResponse>(404, "Not Found")
  public async getConfiguration(
    @Path() key: string
  ): Promise<ConfigurationModel> {
    return await new ConfigurationsService().get(key);
  }

  @Put("{key}")
  @SuccessResponse("204", "No Content")
  @Response<ErrorResponse>(400, "Bad Request")
  @Response<NotFoundResponse>(404, "Not Found")
  @Response<ValidationErrorResponse>(422, "Validation Failed")
  public async putConfiguration(
    @Path() key: string,
    @Body() requestBody: ConfigurationModificationParams
  ): Promise<void> {
    await new ConfigurationsService().update(key, requestBody);
    this.setStatus(204);
    return;
  }

  @Delete("{key}")
  @SuccessResponse("204", "No Content")
  @Response<ErrorResponse>(400, "Bad Request")
  @Response<NotFoundResponse>(404, "Not Found")
  public async deleteConfiguration(@Path() key: string): Promise<void> {
    await new ConfigurationsService().delete(key);
    this.setStatus(204);
    return;
  }
}
