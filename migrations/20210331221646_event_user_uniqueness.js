
exports.up = function(knex) {
    return knex.schema.alterTable('event_user_relation', function(table) {
        table.unique(['user_id', 'event_id'])
      })
  };
  
  exports.down = function(knex) {
    return knex.schema.alterTable('event_user_relation', function(table) {
        table.dropUnique(['user_id', 'event_id'])
      })
  };
  