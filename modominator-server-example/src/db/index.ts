import * as articles from './articles';
import * as comments from './comments';
import * as reviews from './reviews';

import db from './db';

export default {
  instance: db,
  articles,
  comments,
  reviews
};
