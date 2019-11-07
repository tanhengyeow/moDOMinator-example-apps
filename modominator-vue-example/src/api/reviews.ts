import { del, get, patch, post } from './axios';

/**
 * [GET: /reviews] Get recent reviews.
 * [Params] prev?.
 */
export function getReviews(prevId?: number) {
  const prev = prevId ? '?prev=' + prevId : '';
  return get(`/reviews${prev}`);
}

/**
 * [POST: /reviews] Create a new review.
 * [Params] name, content.
 */
export function addReview(name: string, content: string) {
  return post(`/reviews`, { name, content });
}

/**
 * [GET: /reviews/:id] Get a review.
 */
export function getReview(id: number) {
  return get(`/reviews/${id}`);
}

/**
 * [PATCH: /reviews/:id] Edit a review.
 * [Params] name, content.
 */
export function editReview(id: number, name: string, content: string) {
  return patch(`/reviews/${id}`, { name, content });
}

/**
 * [DELETE: /reviews/:id] Delete a review.
 */
export function deleteReview(id: number) {
  return del(`/reviews/${id}`);
}
