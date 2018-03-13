/**
 * Subscribe APIs
 */
module.exports = {
    get: {
        method: 'get',
        path: '/organization',
        description: 'organizations that exist in clout-auth-server',
        fn(req, resp, next) {
            resp.ok();
        }
    },
	create: {
        method: 'put',
        path: '/organization',
        description: 'create a new organizations',
		fn(req, resp, next) {
			resp.ok();
		}
	}
};
