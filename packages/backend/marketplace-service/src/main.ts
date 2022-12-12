/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const port = (process.env.PORT || 4201) as number;
  const host = process.env.SERVICE_NAME;
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: { port, host },
    }
  );
  app.listen();

  Logger.log(`🚀 Microservice [${host}] is running on ${port}`);
}

bootstrap();
