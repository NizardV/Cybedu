import 'reflect-metadata';
import { createApp } from './app.js';
import { AppDataSource } from './database/data-source.js';
import { env } from './config/env.js';

const bootstrap = async () => {
  try {
    await AppDataSource.initialize();
    const app = createApp();

    app.listen(env.port, () => {
      console.log(`Server ready on port ${env.port}`);
    });
  } catch (error) {
    console.error('Failed to start application', error);
    process.exit(1);
  }
};

void bootstrap();
