import * as authentication from '@feathersjs/authentication';
import { setNow, softDelete } from 'feathers-hooks-common';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
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
		find: [],
		get: [],
		create: [setNow('createdAt', 'updatedAt')],
		update: [setNow('updatedAt')],
		patch: [setNow('updatedAt')],
		remove: [],
	},

	after: {
		all: [],
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
