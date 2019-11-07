import { Article } from '../types/article';
import db from './db';

/**
 * Creates a new article.
 */
export async function createNewArticle(title: string, content: string): Promise<Article> {
  const res = await db
    .table('articles')
    .insert({ title, content })
    .returning('*');

  return res[0];
}

/**
 * Deletes the article with the given ID.
 */
export function deleteArticle(id: number): Promise<{}> {
  return db
    .table('articles')
    .where('id', id)
    .delete() as any;
}

/**
 * Edits the article with the given ID.
 */
export function editArticle(id: number, title: string, content: string): Promise<Article> {
  return db
    .table('articles')
    .update({ title, content })
    .where('id', id)
    .returning('*') as any;
}

/**
 * Gets the article with the given ID.
 */
export function getArticle(id: number): Promise<Article | null> {
  return db
    .table('articles')
    .first()
    .where('id', id) as any;
}

/**
 * Gets the most recently created articles.
 */
export function getArticles(prev?: number): Promise<Article[]> {
  let query = db
    .table('articles')
    .select('*');

  if (prev) {
    query = query.where('id', '<', prev);
  }

  return query
    .orderBy('id', 'desc')
    .limit(30) as any;
}
