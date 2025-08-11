import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './infrastructure/swagger/swagger.setup';
import { LoggerService } from './modules/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const loggerService = app.get(LoggerService);
  app.useLogger(loggerService);
  app.use(loggerService.httpMiddleware);

  setupSwagger(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
