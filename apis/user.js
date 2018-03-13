/**
 * Subscribe APIs
 */
module.exports = {
	get: {
		method: 'get',
		path: '/user',
		description: 'write description please',
		fn(req, resp, next) {
			resp.ok([
				{firstName: 'Muhammad', lastName: 'Dadu'}
			]);
		}
	},
	getById: {
		method: 'get',
		path: '/user/:id',
		description: 'write description please',
		fn(req, resp, next) {
			resp.ok();
		}
	},
	create: {
		method: 'put',
		path: '/user',
		description: 'write description please',
		fn(req, resp, next) {
			resp.ok();
		}
	},
	login: {
		method: 'post',
		path: '/user/login',
		description: 'write description please',
		fn(req, resp, next) {
			resp.ok();
		}
	},
	logout: {
		method: 'post',
		path: '/user/login',
		description: 'write description please',
		fn(req, resp, next) {
			resp.ok();
		}
	},
	whoami: {
		method: 'post',
		path: '/user/whoami',
		description: 'write description please',
		fn(req, resp, next) {
			resp.ok();
		}
	},
};
