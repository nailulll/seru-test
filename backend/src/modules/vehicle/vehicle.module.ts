import { Module } from "@nestjs/common";

import { VehicleModelModule } from "./vehicle-model/vehicle-model.module";
import { VehicleBrandModule } from "./vehicle-brand/vehicle-brand.module";
import { VehicleTypeModule } from "./vehicle-type/vehicle-type.module";
import { VehicleYearModule } from "./vehicle-year/vehicle-year.module";
import { PriceListModule } from "./price-list/price-list.module";
import { VehicleService } from "./vehicle.service";
import { VehicleController } from "./vehicle.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VehicleModel } from "./vehicle-model/vehicle-model.entity";

@Module({
  imports: [
    VehicleModelModule,
    VehicleBrandModule,
    VehicleTypeModule,
    VehicleYearModule,
    PriceListModule,
    TypeOrmModule.forFeature([VehicleModel])
  ],
  providers: [VehicleService],
  controllers: [VehicleController]
})
export class VehicleModule {
}
