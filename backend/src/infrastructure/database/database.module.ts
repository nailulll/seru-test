import { Module } from "@nestjs/common";
import { DatabaseConfigService } from "./database-config.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigService,
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
