import { Module } from "@nestjs/common";
import { VehicleTypeService } from "./vehicle-type.service";
import { VehicleTypeController } from "./vehicle-type.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VehicleType } from "./vehicle-type.entity";
import { VehicleBrand } from "../vehicle-brand/vehicle-brand.entity";

@Module({
  imports: [TypeOrmModule.forFeature([VehicleType, VehicleBrand])],
  providers: [VehicleTypeService],
  controllers: [VehicleTypeController]
})
export class VehicleTypeModule {
}
