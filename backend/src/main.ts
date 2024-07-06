import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { ValidationException } from "./infrastructure/errors/validation-exception";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
      transform: true,
      exceptionFactory: (errors) => new ValidationException(errors),
    }),
  );

  await app.listen(3000);
}

bootstrap();
