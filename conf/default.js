/**
 * Default Application Configuration
 */
module.exports = {
	session: {
		secret: process.env.SESSION_SECRET
	},
	jwt: {
		secret: process.env.JWT_SECRET_KEY,
		expire: process.env.JWT_EXPIRES_IN
	}
};
