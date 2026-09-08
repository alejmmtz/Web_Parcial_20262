import {
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
    return this.screeningsService.updateById(Number(id), updateScreeningDTO);
  }

  @Delete(":status")
  remove() {
    return this.screeningsService.removeByStatus();
  }
}
