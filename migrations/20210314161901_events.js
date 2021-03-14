
exports.up = function(knex) {
    return knex.schema.createTable('events', function (table) {
      table.increments('id');
      table.integer('publisher_id').references('id').inTable('publishers');
      table.string('name');
      table.string('description').nullable();
      table.datetime('start_date');
      table.datetime('end_date');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('events')
  };
  