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
import { Customer } from "../models";
import {
  CustomersService,
  CustomerCreationParams,
  CustomerModificationParams,
} from "../services/customer.service";

@Route("api/customers")
export class CustomersController extends Controller {
  @Get()
  public async getCustomers(@Query("name") name: string): Promise<Customer[]> {
    return new CustomersService().search({ name });
  }

  @Get("{id}")
  public async getCustomer(@Path() id: string): Promise<Customer> {
    return new CustomersService().get(id);
  }

  @SuccessResponse("201", "Created") // Custom success response
  @Post()
  public async createCustomer(
    @Body() requestBody: CustomerCreationParams
  ): Promise<{ id: string }> {
    const result = new CustomersService().create(requestBody);
    this.setStatus(201); // set return status 201
    return { id: result.id };
  }

  @SuccessResponse("204", "No Content") // Custom success response
  @Put("{id}")
  public async putCustomer(
    @Path() id: string,
    @Body() requestBody: CustomerModificationParams
  ): Promise<void> {
    new CustomersService().update(id, requestBody);
    this.setStatus(204); // set return status 204
    return;
  }

  @SuccessResponse("204", "No Content") // Custom success response
  @Delete("{id}")
  public async deleteCustomer(@Path() id: string): Promise<void> {
    new CustomersService().delete(id);
    this.setStatus(204); // set return status 204
    return;
  }
}
