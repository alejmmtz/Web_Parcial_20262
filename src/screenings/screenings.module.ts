import { Module } from "@nestjs/common";
import { ScreeningsController } from "./screenings.controller";
import { ScreeningsService } from "./screenings.service";
import { ScreeningEntity } from "./screenings.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([ScreeningEntity])],
  controllers: [ScreeningsController],
  providers: [ScreeningsService],
})
export class ScreeningsModule {}
