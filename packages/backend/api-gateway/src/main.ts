/**
 * API GATEWAY
 * - manage nestjs microservices
 */
import fastifyCsrf from '@fastify/csrf-protection';
import helmet from '@fastify/helmet';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  const globalPrefix = process.env.GATEWAY_API_PREFIX || 'api';
  app.setGlobalPrefix(globalPrefix);

  app.useGlobalPipes(new ValidationPipe());

  // helmet to protect well-known web vulnerabilities by setting HTTP headers appropriately
  await app.register(helmet);

  // protect from Cross-site request forgery
  await app.register(fastifyCsrf);

  const port = process.env.API_GATEWAY_PORT || 4200;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
