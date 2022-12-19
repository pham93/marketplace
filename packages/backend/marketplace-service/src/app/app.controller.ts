import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Order } from '@prisma/client';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'getProducts' })
  getProducts() {
    return this.appService.getProducts();
  }

  @MessagePattern({ cmd: 'addOrder' })
  upsertOrder(order: Order) {
    return this.appService.upsertOrder(order);
  }

  @MessagePattern({ cmd: 'allOrder' })
  allOrderByUserId(userId: string) {
    return this.appService.allOrdersByUserId(userId);
  }
}
