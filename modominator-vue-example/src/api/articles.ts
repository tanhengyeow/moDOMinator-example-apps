import { del, get, patch, post } from './axios';

/**
 * [GET: /articles] Get recent articles.
 * [Params] prev?.
 */
export function getArticles(prevId?: number) {
  const prev = prevId ? '?prev=' + prevId : '';
  return get(`/articles${prev}`);
}

/**
 * [POST: /articles] Create a new article.
 * [Params] title, content.
 */
export function addArticle(title: string, content: string) {
  return post(`/articles`, { title, content });
}

/**
 * [GET: /articles/:id] Get an article.
 */
export function getArticle(id: number) {
  return get(`/articles/${id}`);
}

/**
 * [PATCH: /articles/:id] Edit an article.
 * [Params] title, content.
 */
export function editArticle(id: number, title: string, content: string) {
  return patch(`/articles/${id}`, { title, content });
}

/**
 * [DELETE: /articles/:id] Delete an article.
 */
export function deleteArticle(id: number) {
  return del(`/articles/${id}`);
}
