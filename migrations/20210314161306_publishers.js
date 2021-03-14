
exports.up = function(knex) {
    return knex.schema.createTable('publishers', function (table) {
      table.increments('id');
      table.integer('owner_id').references('id').inTable('users');
      table.string('name');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('publishers')
  };
  