import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { CreateScreeningDTO } from "./dto/create-screening.dto";
import { ScreeningsService } from "./screenings.service";
import { UpdateScreeningDTO } from "./dto/update-screening.dto";

@Controller("screenings")
export class ScreeningsController {
  constructor(private readonly screeningsService: ScreeningsService) {}

  @Post()
  createScreening(@Body() createScreeningDTO: CreateScreeningDTO) {
    if (
      !createScreeningDTO.movieTitle ||
      !createScreeningDTO.roomId ||
      !createScreeningDTO.startsAt
    ) {
      throw new BadRequestException(
        `The petition doesn't have all the required values`,
      );
    }

    /*
    if (!(createScreeningDTO.startsAt instanceof Date)) {
      throw new BadRequestException(
        `Invalid Date Format, ${createScreeningDTO.startsAt}`,
      );
    }
      */

    return this.screeningsService.createScreening(createScreeningDTO);
  }

  @Get()
  getAllScreenings() {
    return this.screeningsService.findAll();
  }

  @Get(":id")
  getScreeningById(@Param("id") id: string) {
    return this.screeningsService.findById(Number(id));
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateScreeningDTO: UpdateScreeningDTO,
  ) {
    if (
      !updateScreeningDTO.movieTitle &&
      !updateScreeningDTO.status &&
      !updateScreeningDTO.startsAt
    ) {
      throw new BadRequestException(
        `The petition doesn't have any of the required values`,
      );
    }

    if (
      updateScreeningDTO.status !== "cancelled" &&
      updateScreeningDTO.status !== "scheduled"
    ) {
      throw new BadRequestException(
        `The status: ${updateScreeningDTO.status} doesn't exist`,
      );
    }
    return this.screeningsService.updateById(Number(id), updateScreeningDTO);
  }

  @Delete("/cancelled")
  remove() {
    return this.screeningsService.removeByStatus();
  }
}
