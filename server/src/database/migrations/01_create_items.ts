import Knex from 'knex';

export async function up(knex:Knex) {
    return knex.schema.createTable('items', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('description').nullable();
        table.string('image').nullable();
    })
}

export async function down(knex:Knex) {
    return knex.schema.dropTable('items');
}