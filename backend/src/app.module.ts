import { Module } from "@nestjs/common";
import { InfrastructureModule } from "src/infrastructure/infrastructure.module";
import { HttpModule } from "./modules/http.module";

@Module({
  imports: [InfrastructureModule, HttpModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
