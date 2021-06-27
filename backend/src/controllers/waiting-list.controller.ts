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
import { WaitingList, WaitingListDetails } from "../models";
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
  public async getWaitingList(@Path() id: string): Promise<WaitingListDetails> {
    return new WaitingListsService().get(id);
  }

  @SuccessResponse("201", "Created") // Custom success response
  @Post()
  public async createWaitingList(
    @Body() requestBody: WaitingListCreationParams
  ): Promise<{ id: string }> {
    const result = new WaitingListsService().create(requestBody);
    this.setStatus(201); // set return status 201
    return { id: result.id };
  }

  @SuccessResponse("204", "No Content") // Custom success response
  @Put("{id}")
  public async putWaitingList(
    @Path() id: string,
    @Body() requestBody: WaitingListModificationParams
  ): Promise<void> {
    new WaitingListsService().update(id, requestBody);
    this.setStatus(204); // set return status 204
    return;
  }

  @SuccessResponse("201", "Created") // Custom success response
  @Post("{id}/customers")
  public async postWaitingListCustomer(
    @Path() id: string,
    @Body() requestBody: WaitingListCustomerCreationParams
  ): Promise<void> {
    new WaitingListsService().addCustomer(id, requestBody);
    this.setStatus(201); // set return status 204
    return;
  }

  @SuccessResponse("204", "No Content") // Custom success response
  @Put("{id}/customers/{customerId}")
  public async putWaitingListCustomer(
    @Path() id: string,
    @Path() customerId: string,
    @Body() requestBody: WaitingListCustomerModificationParams
  ): Promise<void> {
    new WaitingListsService().updateCustomer(id, customerId, requestBody);
    this.setStatus(204); // set return status 204
    return;
  }

  @SuccessResponse("204", "No Content") // Custom success response
  @Post("{id}/customers/{customerId}/call")
  public async postWaitingListCustomerCall(
    @Path() id: string,
    @Path() customerId: string,
    @Body() requestBody: WaitingListCallCustomerParams
  ): Promise<void> {
    new WaitingListsService().callCustomer(id, customerId, requestBody);
    this.setStatus(204); // set return status 204
    return;
  }

  @SuccessResponse("204", "No Content") // Custom success response
  @Delete("{id}/customers/{customerId}")
  public async deleteWaitingListCustomer(
    @Path() id: string,
    @Path() customerId: string
  ): Promise<void> {
    new WaitingListsService().deleteCustomer(id, customerId);
    this.setStatus(204); // set return status 204
    return;
  }
}
