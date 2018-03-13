/**
 * Sequalize config file
 */
module.exports = {
    sequelize: {
        database: process.env.MYSQL_DATABASE,
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        connection: {
            host: process.env.MYSQL_HOSTNAME,
            dialect: 'mysql',
            dialectOptions: {
                multipleStatements: true
            },
            logging: false
        },
        sync: false
    }
};
