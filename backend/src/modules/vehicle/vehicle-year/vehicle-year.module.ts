import { Module } from "@nestjs/common";
import { VehicleYearController } from "./vehicle-year.controller";
import { VehicleYearService } from "./vehicle-year.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VehicleYear } from "./vehicle-year.entity";

@Module({
  imports: [TypeOrmModule.forFeature([VehicleYear])],
  controllers: [VehicleYearController],
  providers: [VehicleYearService]
})
export class VehicleYearModule {
}
