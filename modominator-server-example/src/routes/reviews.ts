import * as Router from '@koa/router';

import db from '../db';
import { HttpStatus } from '../types/http';

const router = new Router();

/**
 * [GET: /reviews] Get recent reviews.
 * [Params] prev?.
 */
router.get('/reviews', async (ctx) => {
  const reviews = await db.reviews.getReviews(ctx.query.prev);

  ctx.body = {
    code: HttpStatus.Ok,
    data: reviews
  };
});

/**
 * [POST: /reviews] Create a new review.
 * [Params] name, content.
 */
router.post('/reviews', async (ctx) => {
  const body = ctx.request.body;
  const review = await db.reviews.createNewReview(body.name, body.content);

  ctx.body = {
    code: HttpStatus.Ok,
    msg: 'Review has been created.',
    data: review
  };
});

/**
 * [GET: /reviews/:id] Get a review.
 */
router.get('/reviews/:id', async (ctx) => {
  const review = await db.reviews.getReview(ctx.params.id);

  if (!review) {
    return { code: HttpStatus.NotFound };
  }

  ctx.body = {
    code: HttpStatus.Ok,
    data: review
  };
});

/**
 * [PATCH: /reviews/:id] Edit a review.
 * [Params] name, content.
 */
router.patch('/reviews/:id', async (ctx) => {
  const body = ctx.request.body;
  const review = await db.reviews.editReview(ctx.params.id, body.name, body.content);

  if (!review) {
    return { code: HttpStatus.NotFound };
  }

  ctx.body = {
    code: HttpStatus.Ok,
    msg: 'Review has been updated.',
    data: review
  };
});

/**
 * [DELETE: /reviews/:id] Delete a review.
 */
router.delete('/reviews/:id', async (ctx) => {
  const review = await db.reviews.getReview(ctx.params.id);

  if (!review) {
    return { code: HttpStatus.NotFound };
  }

  await db.reviews.deleteReview(review.id);

  ctx.body = {
    code: HttpStatus.Ok,
    msg: 'Review has been deleted.'
  };
});

export default router;
