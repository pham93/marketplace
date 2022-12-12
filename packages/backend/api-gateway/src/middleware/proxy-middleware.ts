import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { AuthService } from '../app/auth/auth.service';
import { JwtStrategy } from '../app/auth/jwt.strategy';

@Injectable()
export class ProxyMiddleware implements NestMiddleware {
  logger = new Logger(ProxyMiddleware.name);
  constructor(
    private readonly authService: AuthService,
    private readonly jwt: JwtStrategy
  ) {}

  onProxyReq = (_proxyReq: any, _req: any) => {
    this.logger.debug(
      `proxying ${_req.method.toUpperCase()} ${_req.originalUrl} ${_req.url}`
    );
  };

  use(req: Request, res: Response, next: (error?: unknown) => void) {
    console.log('check');
    createProxyMiddleware({
      target: 'http://localhost:5001',
      onProxyReq: this.onProxyReq.bind(this),
    });
  }
}
