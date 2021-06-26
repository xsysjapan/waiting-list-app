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

@Route("lists")
export class WaitingListsController extends Controller {
  @Get("{waitingListId}")
  public async getWaitingList(
    @Path() waitingListId: string
  ): Promise<WaitingList> {
    return new WaitingListsService().get(waitingListId);
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
