import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { HttpExceptionFilter } from './filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.getHttpAdapter().getInstance().disable('x-powered-by');

  // app.useGlobalFilters(new HttpExceptionFilter());
  const configService = app.get(ConfigService);
  const port = Number(configService.get('HTTP_PORT') ?? 3001);
  await app.listen(port);
}
bootstrap();
