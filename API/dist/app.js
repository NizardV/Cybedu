import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { registerRoutes } from './routes/index.js';
import { notFoundHandler } from './middleware/not-found.js';
import { errorHandler } from './middleware/error-handler.js';
import { swaggerSpec } from './docs/swagger.js';
export const createApp = () => {
    const app = express();
    // Add headers to encourage TCP keep-alive of 10 seconds
    app.use((_req, res, next) => {
        res.setHeader('Connection', 'keep-alive');
        res.setHeader('Keep-Alive', 'timeout=10, max=1000');
        next();
    });
    app.use(express.json());
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get('/docs.json', (_req, res) => {
        res.json(swaggerSpec);
    });
    registerRoutes(app);
    app.use(notFoundHandler);
    app.use(errorHandler);
    return app;
};
