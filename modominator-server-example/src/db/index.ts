import * as articles from './articles';
import * as comments from './comments';

import db from './db';

export default {
  instance: db,
  articles,
  comments
};
