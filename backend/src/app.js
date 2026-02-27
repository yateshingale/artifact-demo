import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import pinoHttp from 'pino-http';
import { env } from './config/env.js';
import { logger } from './config/logger.js';
import authRoutes from './routes/authRoutes.js';
import itemRoutes from './routes/itemRoutes.js';
import healthRoutes from './routes/healthRoutes.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

const app = express();

app.use(pinoHttp({ logger }));
app.use(helmet());
app.use(cors({ origin: env.corsOrigin === '*' ? true : env.corsOrigin.split(',') }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 300 }));
app.use(express.json());

app.use('/health', healthRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/items', itemRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
