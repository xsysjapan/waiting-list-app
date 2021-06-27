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
  ValidationErrorResponse,
  WaitingList,
  WaitingListDetails,
} from "../models";
import {
  WaitingListsService,
  WaitingListCreationParams,
  WaitingListModificationParams,
  WaitingListCustomerCreationParams,
  WaitingListCallCustomerParams,
  WaitingListCustomerModificationParams,
} from "../services/waiting-list.service";

@Route("api/waiting-lists")
export class WaitingListsController extends Controller {
  @Get()
  public async getWaitingLists(
    @Query("name") name: string
  ): Promise<WaitingList[]> {
    return new WaitingListsService().search({ name });
  }

  @Get("{id}")
  @Response<NotFoundResponse>(404, "Not Found")
  public async getWaitingList(@Path() id: string): Promise<WaitingListDetails> {
    return new WaitingListsService().get(id);
  }

  @Post()
  @SuccessResponse("201", "Created")
  @Response<ErrorResponse>(400, "Bad Request")
  @Response<ValidationErrorResponse>(422, "Validation Failed")
  public async createWaitingList(
    @Body() requestBody: WaitingListCreationParams
  ): Promise<CreatedResponse> {
    const result = new WaitingListsService().create(requestBody);
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
    new WaitingListsService().update(id, requestBody);
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
    new WaitingListsService().addCustomer(id, requestBody);
    this.setStatus(201);
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
    new WaitingListsService().updateCustomer(id, customerId, requestBody);
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
    new WaitingListsService().callCustomer(id, customerId, requestBody);
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
    new WaitingListsService().deleteCustomer(id, customerId);
    this.setStatus(204);
    return;
  }

  @Delete("{id}")
  @SuccessResponse("204", "No Content")
  @Response<ErrorResponse>(400, "Bad Request")
  @Response<NotFoundResponse>(404, "Not Found")
  public async deleteWaitingList(@Path() id: string): Promise<void> {
    new WaitingListsService().delete(id);
    this.setStatus(204);
    return;
  }
}
