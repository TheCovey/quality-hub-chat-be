
exports.up = function(knex) {
  return knex.schema
  .createTable('chats', function(chats){
    //   chats.increments();
      chats.string('id').notNullable().unique().primary();
      chats.string('user_1').notNullable();
      chats.string('user_2').notNullable();
  })
  .createTable('messages', function(messages){
      messages.increments();
      messages.string('chat_id').references('id').inTable('chats').onDelete('CASCADE').onUpdate('CASCADE');
      messages.string('sender').notNullable();
      messages.string('content', 750).notNullable();
      messages.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('messages').dropTableIfExists('chats');
};
