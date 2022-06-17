import * as feathersAuthentication from '@feathersjs/authentication';
import * as local from '@feathersjs/authentication-local';
import { UsersData } from './users.class';
// Don't remove this comment. It's needed to format import lines nicely.
import { HooksObject, Service } from '@feathersjs/feathers';
const { authenticate } = feathersAuthentication.hooks;
const { hashPassword, protect } = local.hooks;

const hooks: Partial<HooksObject<any>> = {
	before: {
		all: [],
		find: [authenticate('jwt')],
		get: [authenticate('jwt')],
		create: [
			hashPassword('password'),
			(context: any) => {
				(context.data as UsersData).updatedAt = new Date();
				return context;
			},
		],
		update: [
			hashPassword('password'),
			authenticate('jwt'),
			(context: any) => {
				(context.data as UsersData).updatedAt = new Date();
				return context;
			},
		],
		patch: [hashPassword('password'), authenticate('jwt')],
		remove: [
			authenticate('jwt'),
			(context: any) => {
				(context.data as UsersData).deletedAt = new Date();
				return context;
			},
		],
	},

	after: {
		all: [
			// Make sure the password field is never sent to the client
			// Always must be the last hook
			protect('password'),
		],
		find: [],
		get: [],
		create: [],
		update: [],
		patch: [],
		remove: [],
	},

	error: {
		all: [],
		find: [],
		get: [],
		create: [],
		update: [],
		patch: [],
		remove: [],
	},
};

export default hooks;
