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
  Customer,
  ErrorResponse,
  NotFoundResponse,
  ValidationErrorResponse,
} from "../models";
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
  @Response<NotFoundResponse>(404, "Not Found")
  public async getCustomer(@Path() id: string): Promise<Customer> {
    return new CustomersService().get(id);
  }

  @Post()
  @SuccessResponse("201", "Created")
  @Response<ErrorResponse>(400, "Bad Request")
  @Response<ValidationErrorResponse>(422, "Validation Failed")
  public async createCustomer(
    @Body() requestBody: CustomerCreationParams
  ): Promise<CreatedResponse> {
    const result = new CustomersService().create(requestBody);
    this.setStatus(201);
    return { id: result.id };
  }

  @Put("{id}")
  @SuccessResponse("204", "No Content")
  @Response<ErrorResponse>(400, "Bad Request")
  @Response<NotFoundResponse>(404, "Not Found")
  @Response<ValidationErrorResponse>(422, "Validation Failed")
  public async putCustomer(
    @Path() id: string,
    @Body() requestBody: CustomerModificationParams
  ): Promise<void> {
    new CustomersService().update(id, requestBody);
    this.setStatus(204);
    return;
  }

  @Delete("{id}")
  @SuccessResponse("204", "No Content")
  @Response<ErrorResponse>(400, "Bad Request")
  @Response<NotFoundResponse>(404, "Not Found")
  public async deleteCustomer(@Path() id: string): Promise<void> {
    new CustomersService().delete(id);
    this.setStatus(204);
    return;
  }
}
