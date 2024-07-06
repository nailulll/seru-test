import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { User } from "src/modules/user/user.entity";
import { PriceList } from "../../modules/vehicle/price-list/price-list.entity";
import { VehicleType } from "../../modules/vehicle/vehicle-type/vehicle-type.entity";
import { VehicleModel } from "../../modules/vehicle/vehicle-model/vehicle-model.entity";
import { VehicleYear } from "../../modules/vehicle/vehicle-year/vehicle-year.entity";
import { VehicleBrand } from "../../modules/vehicle/vehicle-brand/vehicle-brand.entity";

@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: "mysql",
      host: this.configService.get("DB_HOST"),
      port: this.configService.get("DB_PORT"),
      username: this.configService.get("DB_USERNAME"),
      password: this.configService.get("DB_PASSWORD"),
      database: this.configService.get("DB_NAME"),
      entities: [User, PriceList, VehicleType, VehicleModel, VehicleYear, VehicleBrand],
      synchronize: true,
    };
  }
}
