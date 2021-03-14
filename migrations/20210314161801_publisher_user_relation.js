
exports.up = function(knex) {
    return knex.schema.createTable('publisher_user_ref', function (table) {
      table.increments('id');
      table.integer('user_id').references('id').inTable('users');
      table.integer('publisher_id').references('id').inTable('publishers');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('publisher_user_ref')
  };
  