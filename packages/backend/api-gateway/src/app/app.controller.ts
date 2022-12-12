import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
@UseGuards(JwtAuthGuard)
export class MarketplaceController {
  constructor(
    @Inject(process.env.MARKETPLACE_SERVICE_NAME)
    private readonly marketplaceService: ClientProxy
  ) {}

  @Get('/products')
  getProducts() {
    return this.marketplaceService.send({ cmd: 'getProducts' }, {});
  }
}
