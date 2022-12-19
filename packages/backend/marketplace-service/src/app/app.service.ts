import { Injectable } from '@nestjs/common';
import { Order, Prisma } from '@prisma/client';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prismaClient: PrismaService) {}

  async getProducts() {
    return await this.prismaClient.product.findMany({ take: 4 });
  }

  async upsertOrder(order: Prisma.OrderUncheckedCreateInput) {
    return await this.prismaClient.order.upsert({
      where: { transaction: order.transaction },
      create: order,
      update: order,
    });
  }

  async allOrdersByUserId(userId: string) {
    return await this.prismaClient.order.findMany({ where: { userId } });
  }
}
