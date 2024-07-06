import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { VehicleBrandService } from "./vehicle-brand.service";
import { AuthGuard } from "../../auth/guards";
import { IsAdminGuard } from "../../auth/guards/is-admin.guard";
import { CreateVehicleBrandDto, QueryVehicleBrandDto, UpdateVehicleBrandDto } from "./dto";

@Controller("vehicle/brand")
@UseGuards(AuthGuard)
export class VehicleBrandController {

  constructor(private readonly vehicleBrandService: VehicleBrandService) {
  }

  @Get("")
  findAll(@Query() dto: QueryVehicleBrandDto) {
    return this.vehicleBrandService.findAll(dto);
  }

  @Get(":id")
  findOne(@Param() params: { id: number }) {
    return this.vehicleBrandService.findOne(params.id);
  }

  @Post("")
  @UseGuards(IsAdminGuard)
  create(@Body() dto: CreateVehicleBrandDto) {
    return this.vehicleBrandService.create(dto);
  }

  @Put(":id")
  @UseGuards(IsAdminGuard)
  update(@Param() params: { id: number }, @Body() dto: UpdateVehicleBrandDto) {
    return this.vehicleBrandService.update(params.id, dto);
  }

  @Delete(":id")
  @UseGuards(IsAdminGuard)
  destroy(@Param() params: { id: number }) {
    return this.vehicleBrandService.destroy(params.id);
  }

}
