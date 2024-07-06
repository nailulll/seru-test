import { Module } from '@nestjs/common';
import { VehicleBrandService } from './vehicle-brand.service';
import { VehicleBrandController } from './vehicle-brand.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { VehicleBrand } from "./vehicle-brand.entity";

@Module({
  imports: [TypeOrmModule.forFeature([VehicleBrand])],
  providers: [VehicleBrandService],
  controllers: [VehicleBrandController]
})
export class VehicleBrandModule {}
