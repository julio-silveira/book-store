import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  Logger.log(`Server running on port ${process.env.API_PORT || 3001}`);
  await app.listen(parseInt(process.env.API_PORT, 10) || 3001);
}
bootstrap();
