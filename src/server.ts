import 'reflect-metadata';

import express from 'express';
import swaggerUI from 'swagger-ui-express';
import { routes } from './routes';
import swaggerFile from './swagger.json';

import './database';

import './shared/container';

const app = express();

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use(express.json());

app.use(routes);

app.listen(3333, () => console.log('Server is running'));
