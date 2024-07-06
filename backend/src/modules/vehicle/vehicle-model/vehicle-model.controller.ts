import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { VehicleModelService } from "./vehicle-model.service";
import { AuthGuard } from "../../auth/guards";
import { CreateVehicleModelDto, QueryVehicleModelDto, UpdateVehicleModelDto } from "./dto";
import { IsAdminGuard } from "../../auth/guards/is-admin.guard";

@Controller("vehicle/model")
@UseGuards(AuthGuard)
export class VehicleModelController {
  constructor(private readonly vehicleModelService: VehicleModelService) {
  }

  @Get("")
  findAll(@Query() dto: QueryVehicleModelDto) {
    return this.vehicleModelService.findAll(dto);
  }

  @Get(":id")
  findOne(@Param() params: { id: number }) {
    return this.vehicleModelService.findOne(params.id);
  }

  @Post("")
  @UseGuards(IsAdminGuard)
  create(@Body() dto: CreateVehicleModelDto) {
    return this.vehicleModelService.create(dto);
  }

  @Put(":id")
  @UseGuards(IsAdminGuard)
  update(@Body() dto: UpdateVehicleModelDto, @Param() params: { id: number }) {
    return this.vehicleModelService.update(params.id, dto);
  }

  @Delete(":id")
  @UseGuards(IsAdminGuard)
  remove(@Param() params: { id: number }) {
    return this.vehicleModelService.remove(params.id);
  }
}
