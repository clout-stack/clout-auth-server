/**
 * Mongoose config file
 */
module.exports = {
    mongoose: {
        uri: `mongodb://${process.env.MONGODB_HOST}/clout-auth-server`,
        conf: {
            server: { auto_reconnect: false },
            user: process.env.MONGODB_USER,
            pass: process.env.MONGODB_PASS
        }
    }
};
