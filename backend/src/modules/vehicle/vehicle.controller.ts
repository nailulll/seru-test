import { Controller, Get, Query } from "@nestjs/common";
import { VehicleService } from "./vehicle.service";
import { QueryVehicleDto } from "./dto";

@Controller("vehicle")
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {
  }

  @Get("")
  findAll(@Query() dto: QueryVehicleDto) {
    return this.vehicleService.findAll(dto);
  }
}
