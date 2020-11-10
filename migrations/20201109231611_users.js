
exports.up = function(knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id');
    table.string('email');
    table.string('name');
    table.string('surname');
    table.string('password');
    table.unique('email')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};
