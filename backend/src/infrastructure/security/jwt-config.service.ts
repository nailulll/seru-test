import { ConfigService } from "@nestjs/config";
import { JwtModuleOptions, JwtOptionsFactory } from "@nestjs/jwt";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor(private readonly configService: ConfigService) {
  }

  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.configService.get("JWT_SECRET"),
      signOptions: {
        expiresIn: "1d", // 1 day
        algorithm: "HS512"
      },
      verifyOptions: {
        algorithms: ["HS512"]
      }
    };
  }
}
