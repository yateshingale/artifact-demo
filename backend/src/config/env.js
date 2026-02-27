import dotenv from 'dotenv';

dotenv.config();

const required = ['NODE_ENV', 'PORT', 'MONGODB_URI', 'JWT_SECRET'];
required.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required env var: ${key}`);
  }
});

export const env = {
  nodeEnv: process.env.NODE_ENV,
  port: Number(process.env.PORT),
  mongodbUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',
  logLevel: process.env.LOG_LEVEL || 'info',
  corsOrigin: process.env.CORS_ORIGIN || '*'
};
