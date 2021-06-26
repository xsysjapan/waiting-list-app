import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Route,
  SuccessResponse,
} from "tsoa";
import { WaitingList } from "../models";
import {
  WaitingListsService,
  WaitingListCreationParams,
} from "../services/waiting-list.service";

@Route("waiting-lists")
export class WaitingListsController extends Controller {
  @Get("{id}")
  public async getWaitingList(@Path() id: string): Promise<WaitingList> {
    return new WaitingListsService().get(id);
  }

  @SuccessResponse("201", "Created") // Custom success response
  @Post()
  public async createWaitingList(
    @Body() requestBody: WaitingListCreationParams
  ): Promise<void> {
    this.setStatus(201); // set return status 201
    new WaitingListsService().create(requestBody);
    return;
  }
}
