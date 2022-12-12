import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from '../common/prisma.service';
import { WalletLoginInput } from './auth.dto';
import { JwTData } from './jwt.strategy';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaClient: PrismaService
  ) {}
  /**
   * create token from address and signature
   *
   * @param walletLoginInput
   * @returns
   */
  async walletLogin(walletLoginInput: WalletLoginInput) {
    let user = await this.prismaClient.user.findUnique({
      where: { address: walletLoginInput.address },
    });

    if (!user) {
      user = await this.prismaClient.user.create({
        data: {
          address: walletLoginInput.address,
          password: walletLoginInput.signature,
        },
      });
    }
    const jwtData: JwTData = {
      address: walletLoginInput.address,
      signature: walletLoginInput.signature,
    };
    return { access_token: this.jwtService.sign(jwtData) };
  }

  async validateUser(payload: JwTData) {
    const user = await this.prismaClient.user.findFirst({
      where: { address: payload.address, password: payload.signature },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
  }
}
