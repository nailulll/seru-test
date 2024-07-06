import { Module } from "@nestjs/common";
import { VehicleModelController } from "./vehicle-model.controller";
import { VehicleModelService } from "./vehicle-model.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VehicleModel } from "./vehicle-model.entity";
import { VehicleType } from "../vehicle-type/vehicle-type.entity";

@Module({
  imports: [TypeOrmModule.forFeature([VehicleModel, VehicleType])],
  providers: [VehicleModelService],
  controllers: [VehicleModelController]
})
export class VehicleModelModule {
}
