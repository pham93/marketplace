import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';
import { JWTConstants } from './auth.constants';
import { AuthService } from './auth.service';

export interface JwTData {
  address: string;
  signature: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private logger = new Logger(JwtStrategy.name);

  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWTConstants.key,
    });
  }

  async validate(payload: JwTData) {
    await this.authService.validateUser(payload);
  }
}
