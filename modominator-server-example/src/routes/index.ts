import * as Router from '@koa/router';
import * as koaBody from 'koa-body';

import { HttpStatus } from '../types/http';
import articlesRouter from './articles';
import commentsRouter from './comments';
import reviewsRouter from './reviews';

const router = new Router();

// Parse form / json / multipart request bodies.
router.use(koaBody({ multipart: true }));

router.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Credentials', 'true');
  await next();
});

router.options('*', (ctx) => {
  ctx.set('Access-Control-Allow-Headers', 'Content-Type');
  ctx.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  ctx.body = { code: HttpStatus.Ok };
});

// Provide behavior common to all API routes.
router.use(async (ctx, next) => {
  const start = Date.now();
  try {
    await next();

    if (ctx.body.code) {
      ctx.status = ctx.body.code;
    }
  } catch (err) {
    console.log(err);
    ctx.body = { code: HttpStatus.ServerError, msg: 'Internal server error.' };
    ctx.status = HttpStatus.ServerError;
  }

  // return JSON data by default
  if (!ctx.type) {
    ctx.type = 'json';
  }
  const ms = Date.now() - start;
  console.log(`${ctx.status} - ${ctx.method} ${ctx.url} - ${ms} ms`);
});

// Add API routes.
router.use(articlesRouter.routes());
router.use(commentsRouter.routes());
router.use(reviewsRouter.routes());

// Add catch-all for API endpoints.
router.all('*', (ctx) => {
  ctx.body = { code: HttpStatus.NotFound, msg: 'Invalid API endpoint.' };
});

export default router;
