exports.up = async (knex) => {
  console.log('[Migration] Apply 20191105120000_initial');

  await knex.schema.createTable('articles', (table) => {
    table.bigIncrements();
    table.string('title', 200);
    table.text('content');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('comments', (table) => {
    table.bigIncrements();
    table.string('style', 200);
    table.text('content');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('reviews', (table) => {
    table.bigIncrements();
    table.string('name', 50);
    table.text('content');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = async (knex) => {
  const tables = ['articles', 'comments', 'reviews'].reverse();

  console.log('[Migration] Rollback 20191105120000_initial');
  console.log('[Migration] Dropping tables: ' + tables.join(', '));

  for (const table of tables) {
    await knex.schema.dropTableIfExists(table);
  }
};
