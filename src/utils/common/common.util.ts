import fs from 'fs';
import https, { Server } from 'https';
import { INestApplication } from '@nestjs/common';

export const parseIp = (req) =>
  req.headers['x-forwarded-for']?.split(',').shift() ||
  req.socket?.remoteAddress;

export function createHttpServer(app: INestApplication): Server {
  const httpsOptions = {
    key: fs.readFileSync('path/to/private-key.pem'),
    cert: fs.readFileSync('path/to/certificate.pem'),
  };
  const httpsServer = https.createServer(
    httpsOptions,
    app.getHttpAdapter().getInstance(),
  );
  return httpsServer;
}
