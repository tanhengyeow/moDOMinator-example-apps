import { Review } from '../types/review';
import db from './db';

/**
 * Creates a new review.
 */
export async function createNewReview(name: string, content: string): Promise<Review> {
  const res = await db
    .table('reviews')
    .insert({ name, content })
    .returning('*');

  return res[0];
}

/**
 * Deletes the review with the given ID.
 */
export function deleteReview(id: number): Promise<{}> {
  return db
    .table('reviews')
    .where('id', id)
    .delete() as any;
}

/**
 * Edits the review with the given ID.
 */
export function editReview(id: number, name: string, content: string): Promise<Review> {
  return db
    .table('reviews')
    .update({ name, content })
    .where('id', id)
    .returning('*') as any;
}

/**
 * Gets the review with the given ID.
 */
export function getReview(id: number): Promise<Review | null> {
  return db
    .table('reviews')
    .first()
    .where('id', id) as any;
}

/**
 * Gets the most recently created reviews.
 */
export function getReviews(prev?: number): Promise<Review[]> {
  let query = db
    .table('reviews')
    .select('*');

  if (prev) {
    query = query.where('id', '<', prev);
  }

  return query
    .orderBy('id', 'desc')
    .limit(30) as any;
}
