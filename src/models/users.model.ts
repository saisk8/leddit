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

					table.dateTime('deletedAt').defaultTo(null);
					table.dateTime('createdAt').defaultTo(db.fn.now());
					table.dateTime('updatedAt').defaultTo(db.fn.now());
				})
				.then(() => console.log(`Created ${tableName} table`))
				.catch((e) =>
					console.error(`Error creating ${tableName} table`, e)
				);
		}
	});
	return db;
}
