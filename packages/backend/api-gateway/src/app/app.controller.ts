import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Order } from '@prisma/client';

@Controller()
export class MarketplaceController {
  constructor(
    @Inject(process.env.MARKETPLACE_SERVICE_NAME)
    private readonly marketplaceService: ClientProxy
  ) {}

  @Get('/products')
  getProducts() {
    return this.marketplaceService.send({ cmd: 'getProducts' }, {});
  }

  @Post('/order')
  upsertOrder(@Body() order: Order) {
    return this.marketplaceService.send({ cmd: 'addOrder' }, order);
  }

  @Get('/allorders/:userId')
  allOrders(@Param('userId') userId: string) {
    return this.marketplaceService.send({ cmd: 'allOrder' }, userId);
  }
}
