/**
 * Passport config file
 */
module.exports = {
    passport: {
        directory: '/strategies',
        serializeUser: 'models.User.serializeUser',
        deserializeUser: 'models.User.deserializeUser',
        /** Configure strategies */
        google: {

        },
        /** Load all strategies */
        useDefault: true,
    }
};
