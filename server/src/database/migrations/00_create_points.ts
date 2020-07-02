import Knex from 'knex';

export async function up(knex:Knex) {
    return knex.schema.createTable('points', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('description').nullable();
        table.string('sharedby').notNullable();
        table.string('city').notNullable();
        table.string('country').notNullable();  
        table.decimal('latitude').notNullable();
        table.decimal('longitude').notNullable();
        table.string('image').nullable();
    })
}

export async function down(knex:Knex) {
    return knex.schema.dropTable('point');
}