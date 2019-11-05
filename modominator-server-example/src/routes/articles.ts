import * as Router from '@koa/router';

import db from '../db';
import { HttpStatus } from '../types/http';

const router = new Router();

/**
 * [GET: /articles] Get recent articles.
 * [Params] prev?.
 */
router.get('/articles', async (ctx) => {
  const articles = await db.articles.getArticles(ctx.query.prev);

  ctx.body = {
    code: HttpStatus.Ok,
    data: articles
  };
});

/**
 * [POST: /articles] Create a new article.
 * [Params] title, content.
 */
router.post('/articles', async (ctx) => {
  const body = ctx.request.body;
  const article = await db.articles.createNewArticle(body.title, body.content);

  ctx.body = {
    code: HttpStatus.Ok,
    msg: `Article ${article.title} has been created.`,
    data: article
  };
});

/**
 * [GET: /articles/:id] Get an article.
 */
router.get('/articles/:id', async (ctx) => {
  const article = await db.articles.getArticle(ctx.params.id);

  if (!article) {
    return { code: HttpStatus.NotFound };
  }

  ctx.body = {
    code: HttpStatus.Ok,
    data: article
  };
});

/**
 * [PATCH: /articles/:id] Edit an article.
 */
router.patch('/articles/:id', async (ctx) => {
  const body = ctx.request.body;
  const article = await db.articles.editArticle(ctx.params.id, body.title, body.content);

  if (!article) {
    return { code: HttpStatus.NotFound };
  }

  ctx.body = {
    code: HttpStatus.Ok,
    msg: `Article ${article.title} has been updated.`,
    data: article
  };
});

/**
 * [DELETE: /articles/:id] Delete an article.
 */
router.delete('/articles/:id', async (ctx) => {
  const article = await db.articles.getArticle(ctx.params.id);

  if (!article) {
    return { code: HttpStatus.NotFound };
  }

  await db.articles.deleteArticle(article.id);

  ctx.body = {
    code: HttpStatus.Ok,
    msg: `Article ${article.title} has been deleted.`
  };
});

export default router;
