import { Module } from "@nestjs/common";

import { SecurityModule } from "./security/security.module";
import { DatabaseModule } from "./database/database.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    DatabaseModule,
    SecurityModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
  ]
})
export class InfrastructureModule {
}
