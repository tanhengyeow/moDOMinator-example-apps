import * as Router from '@koa/router';

import db from '../db';
import { HttpStatus } from '../types/http';

const router = new Router();

/**
 * [GET: /comments] Get recent comments.
 * [Params] prev?.
 */
router.get('/comments', async (ctx) => {
  const comments = await db.comments.getComments(ctx.query.prev);

  ctx.body = {
    code: HttpStatus.Ok,
    data: comments
  };
});

/**
 * [POST: /comments] Create a new comment.
 * [Params] style, content.
 */
router.post('/comments', async (ctx) => {
  const body = ctx.request.body;
  const comment = await db.comments.createNewComment(body.style, body.content);

  ctx.body = {
    code: HttpStatus.Ok,
    msg: 'Comment has been created.',
    data: comment
  };
});

/**
 * [GET: /comments/:id] Get a comment.
 */
router.get('/comments/:id', async (ctx) => {
  const comment = await db.comments.getComment(ctx.params.id);

  if (!comment) {
    return { code: HttpStatus.NotFound };
  }

  ctx.body = {
    code: HttpStatus.Ok,
    data: comment
  };
});

/**
 * [PATCH: /comments/:id] Edit a comment.
 * [Params] style, content.
 */
router.patch('/comments/:id', async (ctx) => {
  const body = ctx.request.body;
  const comment = await db.comments.editComment(ctx.params.id, body.style, body.content);

  if (!comment) {
    return { code: HttpStatus.NotFound };
  }

  ctx.body = {
    code: HttpStatus.Ok,
    msg: 'Comment has been updated.',
    data: comment
  };
});

/**
 * [DELETE: /comments/:id] Delete a comment.
 */
router.delete('/comments/:id', async (ctx) => {
  const comment = await db.comments.getComment(ctx.params.id);

  if (!comment) {
    return { code: HttpStatus.NotFound };
  }

  await db.comments.deleteComment(comment.id);

  ctx.body = {
    code: HttpStatus.Ok,
    msg: 'Comment has been deleted.'
  };
});

export default router;
