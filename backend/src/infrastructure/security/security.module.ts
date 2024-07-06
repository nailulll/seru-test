import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { JwtConfigService } from "./jwt-config.service";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [
    JwtModule.registerAsync({
      useClass: JwtConfigService,
      inject: [ConfigService],
      global: true,
    }),
  ],
})
export class SecurityModule {}
