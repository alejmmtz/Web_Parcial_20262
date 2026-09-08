import { Module } from "@nestjs/common";
import { ScreeningsController } from "./screenings.controller";
import { ScreeningsService } from "./screenings.service";
import { ScreeningEntity } from "./screenings.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoomEntity } from "../rooms/rooms.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ScreeningEntity, RoomEntity])],
  controllers: [ScreeningsController],
  providers: [ScreeningsService],
})
export class ScreeningsModule {}
