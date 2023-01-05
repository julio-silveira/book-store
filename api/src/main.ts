import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  Logger.log(`Server running on port ${process.env.API_PORT || 3001}`);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(parseInt(process.env.API_PORT, 10) || 3001);
}
bootstrap();
