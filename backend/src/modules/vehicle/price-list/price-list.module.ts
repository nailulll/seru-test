import { Module } from "@nestjs/common";
import { PriceListController } from "./price-list.controller";
import { PriceListService } from "./price-list.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PriceList } from "./price-list.entity";
import { VehicleModel } from "../vehicle-model/vehicle-model.entity";
import { VehicleYear } from "../vehicle-year/vehicle-year.entity";

@Module({
  imports: [TypeOrmModule.forFeature([PriceList, VehicleModel, VehicleYear])],
  controllers: [PriceListController],
  providers: [PriceListService]
})
export class PriceListModule {
}
