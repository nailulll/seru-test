import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { VehicleTypeService } from "./vehicle-type.service";
import { CreateVehicleTypeDto, QueryVehicleTypeDto, UpdateVehicleTypeDto } from "./dto";
import { AuthGuard } from "../../auth/guards";
import { IsAdminGuard } from "../../auth/guards/is-admin.guard";

@Controller("vehicle/type")
@UseGuards(AuthGuard)
export class VehicleTypeController {

  constructor(private readonly vehicleTypeService: VehicleTypeService) {
  }

  @Get("")
  findAll(@Query() dto: QueryVehicleTypeDto) {
    return this.vehicleTypeService.findAll(dto);
  }

  @Get(":id")
  findOne(@Param() params: { id: number }) {
    return this.vehicleTypeService.findOne(params.id);
  }

  @Post("")
  @UseGuards(IsAdminGuard)
  create(@Body() dto: CreateVehicleTypeDto) {
    return this.vehicleTypeService.create(dto);
  }

  @Put(":id")
  @UseGuards(IsAdminGuard)
  update(@Param() params: { id: number }, @Body() dto: UpdateVehicleTypeDto) {
    return this.vehicleTypeService.update(params.id, dto);
  }

  @Delete(":id")
  @UseGuards(IsAdminGuard)
  remove(@Param() params: { id: number }) {
    return this.vehicleTypeService.destroy(params.id);
  }

}
