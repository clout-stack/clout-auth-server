/**
 * Subscribe APIs
 */
module.exports = {
	get: {
		method: 'get',
		path: '/user',
		description: 'write description please',
		fn(req, resp, next) {
			let { User } = this.models;
			let query = {};

			return User.find(query)
				.then((data) => resp.ok(data))
				.catch((err) => resp.error(err));
		}
	},
	getByUsername: {
		method: 'get',
		path: '/user/:username',
		description: 'write description please',
		fn(req, resp, next) {
			let { User } = this.models;
			let query = {
				username: req.params.username
			};

			return User.findOne(query)
				.then((data) => resp.ok(data))
				.catch((err) => resp.error(err));
		}
	},
	register: {
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
			passport.authenticate('local', (err, user, info) => {
				if (err) { 
					return resp.error(err);
				}

				if (!user) {
					return resp.notAuthorized('supplied credentials are invalid');
				}

				req.logIn(user, function (err) {
					if (err) {
						return resp.error(err);
					}
					return res.redirect('/apis/users/' + user.username);
				});
			})(req, resp, next);
		}
	},
	logout: {
		method: 'post',
		path: '/user/login',
		description: 'write description please',
		fn(req, resp, next) {
			req.logout();
			resp.ok();
		}
	},
	whoami: {
		method: 'post',
		path: '/user/whoami',
		description: 'write description please',
		fn(req, resp, next) {
			if (!req.user) {
				return resp.notAuthorized('user is not authorized');
			}

			return res.redirect('/apis/users/' + req.user.username);
		}
	},
};
