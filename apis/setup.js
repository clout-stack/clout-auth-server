/**
 * Subscribe APIs
 */
const { config } = require('clout-js');

function noSuperuserOnly(req, resp, next) {
    let { User } = req.models;

    if (req.user && req.user.isSuperUser) {
        next();
    }

    User.findOne({ isSuperUser: true }, (err, user) => {
        if (!user) {
            return next();
        }

        return resp.unauthorized();
    });
};

module.exports = {
    isInitialized: {
        method: 'get',
        path: '/setup',
        description: 'check if setup needs to be run',
        hooks: [noSuperuserOnly],
        fn(req, resp, next) {
            resp.ok();
        }
    },
    getMetadata: {
        method: 'get',
        path: '/setup/metadata',
        description: 'check if setup needs to be run',
        hooks: [noSuperuserOnly],
        fn(req, resp, next) {
            let { Metadata } = req.models;

            Metadata.get()
                .then((metadata) => resp.ok(metadata))
                .catch((err) => resp.error(err));
        }
    },
    setMetadata: {
        method: 'put',
        path: '/setup/metadata',
        description: 'update site metadata',
        hooks: [noSuperuserOnly],
        fn(req, resp, next) {
            let { Metadata } = req.models;

            Metadata.set(req.body)
                .then((metadata) => resp.ok(metadata))
                .catch((err) => resp.error(err));
        }
    },
    hasSuperorganization: {
        method: 'get',
        path: '/setup/organization',
        description: 'get super organization',
        hooks: [noSuperuserOnly],
        fn(req, resp) {
            let { Organization } = req.models;

            Organization.findOne({ username: config.metadata.superOrganization })
                .then((metadata) => resp.ok(metadata))
                .catch((err) => resp.error(err));
        }
    },
    createSuperUser: {
        method: 'put',
        path: '/setup/superuser',
        description: 'create superuser',
        hooks: [noSuperuserOnly],
        fn(req, resp, next) {
            let { User } = req.models;
            let { password, name, email } = req.body;
            let newUser = {
                password, name, email,
                isSuperUser: false,
                isActive: false
            };

            User.create(newUser, (err, user) => {
                if (err) {
                    return resp.error(err);
                }

                resp.ok(user);
            });
        }
    }
};
