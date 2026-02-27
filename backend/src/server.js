import app from './app.js';
import { env } from './config/env.js';
import { connectDatabase } from './config/db.js';
import { logger } from './config/logger.js';

(async () => {
  try {
    await connectDatabase();
    app.listen(env.port, () => {
      logger.info({ port: env.port }, 'API server started');
    });
  } catch (error) {
    logger.error({ err: error }, 'Failed to bootstrap application');
    process.exit(1);
  }
})();
