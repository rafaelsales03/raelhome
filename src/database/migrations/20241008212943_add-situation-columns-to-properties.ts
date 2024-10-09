import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.alterTable('properties', (table) => {
		table.boolean('is_rent').notNullable().defaultTo(true);
		table.boolean('is_sale').notNullable().defaultTo(true);
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.alterTable('properties', (table) => {
		table.dropColumn('is_rent');
		table.dropColumn('is_sale');
	});
}
