import { Comment } from '../types/comment';
import db from './db';

/**
 * Creates a new comment.
 */
export function createNewComment(content: string): Promise<Comment> {
  return db
    .table('comments')
    .insert({ content })
    .returning('*') as any;
}

/**
 * Deletes the comment with the given ID.
 */
export function deleteComment(id: number): Promise<{}> {
  return db
    .table('comments')
    .where('id', id)
    .delete() as any;
}

/**
 * Edits the comment with the given ID.
 */
export function editComment(id: number, content: string): Promise<Comment> {
  return db
    .table('comments')
    .update({ content })
    .where('id', id)
    .returning('*') as any;
}

/**
 * Gets the comment with the given ID.
 */
export function getComment(id: number): Promise<Comment | null> {
  return db
    .table('comments')
    .first()
    .where('id', id) as any;
}

/**
 * Gets the most recently created comments.
 */
export function getComments(prev?: number): Promise<Comment[]> {
  let query = db
    .table('comments')
    .select('*');

  if (prev) {
    query = query.where('id', '<', prev);
  }

  return query
    .orderBy('id', 'desc')
    .limit(30) as any;
}
