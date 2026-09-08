import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ScreeningEntity } from "./screenings.entity";
import { Repository } from "typeorm";
import { CreateScreeningDTO } from "./dto/create-screening.dto";
import { RoomEntity } from "../rooms/rooms.entity";
import { UpdateScreeningDTO } from "./dto/update-screening.dto";

@Injectable()
export class ScreeningsService {
  constructor(
    @InjectRepository(ScreeningEntity)
    private readonly screeningsRepository: Repository<ScreeningEntity>,

    @InjectRepository(RoomEntity)
    private readonly roomsRepository: Repository<RoomEntity>,
  ) {}

  async createScreening(
    createScreeningDTO: CreateScreeningDTO,
  ): Promise<ScreeningEntity> {
    const room = await this.roomsRepository.findOneBy({
      id: createScreeningDTO.roomId,
    });

    if (!room) {
      throw new NotFoundException(
        `Customer with id ${createScreeningDTO.roomId} was not found`,
      );
    }

    const screening = await this.screeningsRepository.create({
      movieTitle: createScreeningDTO.movieTitle,
      startsAt: createScreeningDTO.startsAt,
      room,
      status: "scheduled",
    });

    return this.screeningsRepository.save(screening);
  }

  async findAll(): Promise<ScreeningEntity[]> {
    return this.screeningsRepository.find({
      relations: {
        room: true,
      },
      order: {
        id: "ASC",
      },
    });
  }

  async findById(id: number): Promise<ScreeningEntity> {
    const screening = await this.screeningsRepository.findOne({
      where: { id },
      relations: {
        room: true,
      },
    });

    if (!screening) {
      throw new NotFoundException(`Screening with id ${id} was not found`);
    }

    return screening;
  }

  async updateById(
    id: number,
    updateScreeningDto: UpdateScreeningDTO,
  ): Promise<ScreeningEntity> {
    const screening = await this.findById(id);

    this.screeningsRepository.merge(screening, updateScreeningDto);

    return this.screeningsRepository.save(screening);
  }

  async removeByStatus(): Promise<string> {
    const screening = await this.screeningsRepository.findBy({
      status: "cancelled",
    });

    this.screeningsRepository.remove(screening);

    const deleted = " deleted: " + screening.length;

    return deleted;
  }
}
