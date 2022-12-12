import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { WalletLoginInput } from './auth.dto';
import { AuthService } from './auth.service';

import * as crypto from 'crypto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Post('/walletlogin')
  walletLogin(@Body() walletLoginInput: WalletLoginInput) {
    this.logger.debug(
      `Attempting to login with wallet addr: ${walletLoginInput.address}`
    );
    return this.authService.walletLogin(walletLoginInput);
  }

  @Get('nonce')
  getNonce() {
    return crypto.randomUUID();
  }
}
