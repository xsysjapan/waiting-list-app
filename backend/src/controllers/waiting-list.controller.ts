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
  ValidateError,
} from "tsoa";
import {
  CreatedResponse,
  ErrorResponse,
  NotFoundResponse,
  ValidationErrorResponse,
  WaitingListModel,
  WaitingListDetailsModel,
  DefaultWaitingListNameModel,
} from "../models";
import {
  WaitingListsService,
  WaitingListCreationParams,
  WaitingListModificationParams,
  WaitingListCustomerCreationParams,
  WaitingListCallCustomerParams,
  WaitingListCustomerModificationParams,
  WaitingListMoveCustomerParams,
  WaitingListUpdateCallingStatusParams,
} from "../services/waiting-list.service";

@Route("api/waiting-lists")
export class WaitingListsController extends Controller {
  @Get()
  public getWaitingLists(
    @Query("name") name?: string,
    @Query("active") active?: boolean
  ): Promise<WaitingListModel[]> {
    return new WaitingListsService().search({ name, active });
  }

  @Get("defaultname")
  public getDefaultWaitingListName(
    @Query("preferedName") preferedName: string
  ): Promise<DefaultWaitingListNameModel> {
    return new WaitingListsService().getDefaultName(preferedName);
  }

  @Get("{id}")
  @Response<NotFoundResponse>(404, "Not Found")
  public getWaitingList(@Path() id: string): Promise<WaitingListDetailsModel> {
    return new WaitingListsService().get(id);
  }

  @Post()
  @SuccessResponse("201", "Created")
  @Response<ErrorResponse>(400, "Bad Request")
  @Response<ValidationErrorResponse>(422, "Validation Failed")
  public async createWaitingList(
    @Body() requestBody: WaitingListCreationParams
  ): Promise<CreatedResponse> {
    const result = await new WaitingListsService().create(requestBody);
    this.setStatus(201);
    return { id: result.id };
  }

  @Put("{id}")
  @SuccessResponse("204", "No Content")
  @Response<ErrorResponse>(400, "Bad Request")
  @Response<NotFoundResponse>(404, "Not Found")
  @Response<ValidationErrorResponse>(422, "Validation Failed")
  public async putWaitingList(
    @Path() id: string,
    @Body() requestBody: WaitingListModificationParams
  ): Promise<void> {
    if (requestBody.active === undefined && requestBody.name === undefined) {
      throw new ValidateError(
        {
          ["name"]: {
            message: "name or active must specified",
            value: undefined,
          },
          ["active"]: {
            message: "name or active must specified",
            value: undefined,
          },
        },
        "Validation Error"
      );
    }

    await new WaitingListsService().update(id, requestBody);
    this.setStatus(204);
    return;
  }

  @Post("{id}/customers")
  @SuccessResponse("204", "No Content")
  @Response<ErrorResponse>(400, "Bad Request")
  @Response<NotFoundResponse>(404, "Not Found")
  @Response<ValidationErrorResponse>(422, "Validation Failed")
  public async postWaitingListCustomer(
    @Path() id: string,
    @Body() requestBody: WaitingListCustomerCreationParams
  ): Promise<void> {
    await new WaitingListsService().addCustomer(id, requestBody);
    this.setStatus(204);
    return;
  }

  @Put("{id}/customers/{customerId}")
  @SuccessResponse("204", "No Content")
  @Response<ErrorResponse>(400, "Bad Request")
  @Response<NotFoundResponse>(404, "Not Found")
  @Response<ValidationErrorResponse>(422, "Validation Failed")
  public async putWaitingListCustomer(
    @Path() id: string,
    @Path() customerId: string,
    @Body() requestBody: WaitingListCustomerModificationParams
  ): Promise<void> {
    await new WaitingListsService().updateCustomer(id, customerId, requestBody);
    this.setStatus(204);
    return;
  }

  @Post("{id}/customers/{customerId}/call")
  @SuccessResponse("204", "No Content")
  @Response<ErrorResponse>(400, "Bad Request")
  @Response<NotFoundResponse>(404, "Not Found")
  @Response<ValidationErrorResponse>(422, "Validation Failed")
  public async postWaitingListCustomerCall(
    @Path() id: string,
    @Path() customerId: string,
    @Body() requestBody: WaitingListCallCustomerParams
  ): Promise<void> {
    await new WaitingListsService().callCustomer(id, customerId, requestBody);
    this.setStatus(204);
    return;
  }

  @Put("{id}/customers/{customerId}/status")
  @SuccessResponse("204", "No Content")
  @Response<ErrorResponse>(400, "Bad Request")
  @Response<NotFoundResponse>(404, "Not Found")
  @Response<ValidationErrorResponse>(422, "Validation Failed")
  public async putWaitingListCustomerStatus(
    @Path() id: string,
    @Path() customerId: string,
    @Body() requestBody: WaitingListUpdateCallingStatusParams
  ): Promise<void> {
    await new WaitingListsService().updateCustomerCallingStatus(
      id,
      customerId,
      requestBody
    );
    this.setStatus(204);
    return;
  }

  @Post("{id}/customers/{customerId}/move")
  @SuccessResponse("204", "No Content")
  @Response<ErrorResponse>(400, "Bad Request")
  @Response<NotFoundResponse>(404, "Not Found")
  @Response<ValidationErrorResponse>(422, "Validation Failed")
  public async postWaitingListCustomerOrder(
    @Path() id: string,
    @Path() customerId: string,
    @Body() requestBody: WaitingListMoveCustomerParams
  ): Promise<void> {
    await new WaitingListsService().moveCustomer(id, customerId, requestBody);
    this.setStatus(204);
    return;
  }

  @Delete("{id}/customers/{customerId}")
  @SuccessResponse("204", "No Content")
  @Response<ErrorResponse>(400, "Bad Request")
  @Response<NotFoundResponse>(404, "Not Found")
  public async deleteWaitingListCustomer(
    @Path() id: string,
    @Path() customerId: string
  ): Promise<void> {
    await new WaitingListsService().deleteCustomer(id, customerId);
    this.setStatus(204);
    return;
  }

  @Delete("{id}")
  @SuccessResponse("204", "No Content")
  @Response<ErrorResponse>(400, "Bad Request")
  @Response<NotFoundResponse>(404, "Not Found")
  public async deleteWaitingList(@Path() id: string): Promise<void> {
    await new WaitingListsService().delete(id);
    this.setStatus(204);
    return;
  }
}
