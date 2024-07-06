import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { VehicleModule } from "./vehicle/vehicle.module";

@Module({
  imports: [AuthModule, UserModule, VehicleModule],
  providers: [],
  controllers: []
})
export class HttpModule {
}
