import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import swaggerUI from 'swagger-ui-express';
import { routes } from './routes';
import swaggerFile from './swagger.json';
import './database';
import './shared/container';
import { AppError } from './errors/AppError';

const app = express();

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use(express.json());

app.use(routes);

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      message: error.message
    });
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal Server Error - ${error.message}`
  });
});

app.listen(3333, () => console.log('Server is running'));
