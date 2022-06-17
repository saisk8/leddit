import * as feathersAuthentication from '@feathersjs/authentication';
import * as local from '@feathersjs/authentication-local';

import { HooksObject } from '@feathersjs/feathers';
const { authenticate } = feathersAuthentication.hooks;
const { hashPassword, protect } = local.hooks;
import { softDelete, setNow } from 'feathers-hooks-common';

const hooks: Partial<HooksObject<any>> = {
	before: {
		all: [
			softDelete({
				deletedQuery: async () => {
					return { deletedAt: null };
				},
				removeData: async () => {
					return { deletedAt: new Date() };
				},
			}),
		],
		find: [authenticate('jwt')],
		get: [authenticate('jwt')],
		create: [hashPassword('password'), setNow('createdAt', 'updatedAt')],
		update: [
			hashPassword('password'),
			authenticate('jwt'),
			setNow('updatedAt'),
		],
		patch: [
			hashPassword('password'),
			authenticate('jwt'),
			setNow('updatedAt'),
		],
		remove: [authenticate('jwt')],
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
