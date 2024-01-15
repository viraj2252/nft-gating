import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import helmet from 'helmet';
import path from 'path';
import { pino } from 'pino';

import compressFilter from '@common/middleware/compressFilter';
import errorHandler from '@common/middleware/errorHandler';
import rateLimiter from '@common/middleware/rateLimiter';
import requestLogger from '@common/middleware/requestLogger';
import { getCorsOrigin } from '@common/utils/envConfig';
import { contractRouter } from '@modules/contract/contractRoutes';
import { healthCheckRouter } from '@modules/healthCheck/healthCheckRoutes';
import { usersRouter } from '@modules/user/userRoutes';

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

const logger = pino({ name: 'server start' });
const app: Express = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(compression({ filter: compressFilter }));
app.use(rateLimiter);

// Request logging
app.use(requestLogger());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// Routes
app.use('/health-check', healthCheckRouter);
app.use('/users', usersRouter);
app.use('/contracts', contractRouter);

// Error handlers
app.use(errorHandler());

export { app, logger };
