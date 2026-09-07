import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RoomEntity } from "./rooms.entity";
import { Repository } from "typeorm";
import { CreateRoomDTO } from "./dto/create-room.dto";

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly roomsRepository: Repository<RoomEntity>,
  ) {}

  async createRoom(createRoomDTO: CreateRoomDTO): Promise<RoomEntity> {
    if (createRoomDTO.capacity < 1) {
      throw new NotFoundException(
        `The room's capacity cannot be less than or 0 `,
      );
    }

    const room = this.roomsRepository.create({
      name: createRoomDTO.name,
      capacity: createRoomDTO.capacity,
    });

    return this.roomsRepository.save(room);
  }
}
