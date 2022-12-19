import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { MarketplaceController } from './app.controller';
import { PrismaService } from './common/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    /**
     * Register nestjs microservices
     */
    ClientsModule.register([
      {
        name: process.env.MARKETPLACE_SERVICE_NAME as string,
        transport: Transport.TCP,
        options: {
          port: process.env.MARKETPLACE_SERVICE_PORT as unknown as number,
          host: process.env.MARKETPLACE_SERVICE_HOST as string,
        },
      },
    ]),
  ],
  controllers: [MarketplaceController],
  providers: [PrismaService],
})
export class AppModule {}
