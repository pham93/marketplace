import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prismaClient: PrismaService) {}

  async getProducts() {
    return await this.prismaClient.product.findMany({ take: 4 });
  }
}
