import { Params } from '@feathersjs/feathers';
import { Service, KnexServiceOptions } from 'feathers-knex';
import { Application } from '../../declarations';

export type UsersData = {
	id?: string;
	email?: string;
	username: string;
	password: string;
	githubId?: string;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date | null;
};

export class Users extends Service {
	//eslint-disable-next-line @typescript-eslint/no-unused-vars
	constructor(options: Partial<KnexServiceOptions>, app: Application) {
		super({
			...options,
			name: 'users',
		});
	}
}
