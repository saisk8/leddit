// posts-model.ts - A KnexJS
//
// See http://knexjs.org/
// for more of what you can do here.
import { Knex } from 'knex';
import { Application } from '../declarations';

export default function (app: Application): Knex {
	const db: Knex = app.get('knexClient');
	const tableName = 'posts';
	db.schema.hasTable(tableName).then((exists) => {
		if (!exists) {
			db.schema
				.createTable(tableName, (table) => {
					table.increments('id');
					table.string('title');
					table.text('text');
					table.integer('points').defaultTo(0);
					table
						.integer('author')
						.references('id')
						.inTable('users')
						.onDelete('SET NULL');
					// Add created_at and updated_at
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
