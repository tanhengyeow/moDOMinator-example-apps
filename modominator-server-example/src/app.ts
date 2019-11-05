// Load environment variables from .env.
import * as dotenv from 'dotenv';
dotenv.config();

import * as Koa from 'koa';

import router from './routes';

const app = new Koa();

// Add application routes.
app.use(router.routes());
app.use(router.allowedMethods());

export default app;
