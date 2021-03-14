
exports.up = function(knex) {
    return knex.schema.createTable('event_user_relation', function (table) {
      table.increments('id');
      table.integer('user_id').references('id').inTable('users');
      table.integer('event_id').references('id').inTable('events');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('event_user_relation')
  };
  