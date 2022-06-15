// users-model.ts - A KnexJS
//
// See http://knexjs.org/
// for more of what you can do here.
import { Application } from '../declarations';
import { Knex } from 'knex';

export default function (app: Application): Knex {
	const db: Knex = app.get('knexClient');
	const tableName = 'users';

	db.schema.hasTable(tableName).then((exists) => {
		if (!exists) {
			db.schema
				.createTable(tableName, (table) => {
					table.increments('id').primary();

					table.string('email').unique();
					table.string('username').unique();
					table.string('password').notNullable();
					table.string('githubId');
					table.integer('posts').references('id').inTable('posts');
					// Add created_at and updated_at
					table.timestamps();
					table.dateTime('deleted_at').defaultTo(null);
				})
				.then(() => console.log(`Created ${tableName} table`))
				.catch((e) =>
					console.error(`Error creating ${tableName} table`, e)
				);
		}
	});
	return db;
}