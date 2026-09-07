import { Body, Controller, Post } from "@nestjs/common";
import { CreateRoomDTO } from "./dto/create-room.dto";
import { RoomsService } from "./rooms.service";

@Controller("rooms")
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  createRoom(@Body() createRoomDTO: CreateRoomDTO) {
    return this.roomsService.createRoom(createRoomDTO);
  }
}
