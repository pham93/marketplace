import {
  INestApplication,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { Request } from '@nestjs/common';
import passport = require('passport');
import { Strategy } from 'passport-jwt';

const onProxyReq = (_proxyReq: any, _req: any) => {
  const LOGGER_NAME = '[Proxy Middleware]';
  Logger.debug(
    `${LOGGER_NAME} - proxying ${_req.method.toUpperCase()} ${
      _req.originalUrl
    } ${_req.url}`
  );
};

export const proxies = (app: INestApplication) => {
  app.use((req: Request, res: Response, next: () => void) => {
    // TODO: protect resources
    if (true) {
      next();
    }
  });

  app.use(
    '/app/_next/webpack-hmr',
    createProxyMiddleware({
      target: `ws://localhost:5001/app/_next/webpack-hmr`,
      autoRewrite: true,
      ws: true,
    })
  );

  app.use(
    '/app',
    createProxyMiddleware({
      target: `http://localhost:5001/`,
      onProxyReq,
    })
  );
};
