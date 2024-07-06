import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { VehicleYearService } from "./vehicle-year.service";
import { CreateVehicleYearDto, QueryVehicleYearDto } from "./dto";
import { AuthGuard } from "../../auth/guards";
import { IsAdminGuard } from "../../auth/guards/is-admin.guard";

@Controller("vehicle/year")
@UseGuards(AuthGuard)
export class VehicleYearController {

  constructor(private readonly vehicleYearService: VehicleYearService) {
  }

  @Get("")
  findAll(@Query() dto: QueryVehicleYearDto) {
    return this.vehicleYearService.findAll(dto);
  }

  @Get(":id")
  findOne(@Param() params: { id: number }) {
    return this.vehicleYearService.findOne(params.id);
  }

  @Post("")
  @UseGuards(IsAdminGuard)
  create(@Body() dto: CreateVehicleYearDto) {
    return this.vehicleYearService.create(dto);
  }

  @Put(":id")
  @UseGuards(IsAdminGuard)
  update(@Param() params: { id: number }, @Body() dto: CreateVehicleYearDto) {
    return this.vehicleYearService.update(dto, params.id);
  }

  @Delete(":id")
  @UseGuards(IsAdminGuard)
  destroy(@Param() params: { id: number }) {
    return this.vehicleYearService.destroy(params.id);
  }

}
