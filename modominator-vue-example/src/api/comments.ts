import { del, get, patch, post } from './axios';

/**
 * [GET: /comments] Get recent comments.
 * [Params] prev?.
 */
export function getComments(prevId?: number) {
  const prev = prevId ? '?prev=' + prevId : '';
  return get(`/comments${prev}`);
}

/**
 * [POST: /comments] Create a new comment.
 * [Params] style, content.
 */
export function addComment(style: string, content: string) {
  return post(`/comments`, { style, content });
}

/**
 * [GET: /comments/:id] Get a comment.
 */
export function getComment(id: number) {
  return get(`/comments/${id}`);
}

/**
 * [PATCH: /comments/:id] Edit a comment.
 * [Params] style, content.
 */
export function editComment(id: number, style: string, content: string) {
  return patch(`/comments/${id}`, { style, content });
}

/**
 * [DELETE: /comments/:id] Delete a comment.
 */
export function deleteComment(id: number) {
  return del(`/comments/${id}`);
}
