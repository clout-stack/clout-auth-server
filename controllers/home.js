module.exports = {
    path: '*',
    fn(req, resp, next) {
        const APP_PATHS = ['/', '/login', '/register'];

        if (APP_PATHS.indexOf(req.path) === -1) {
            return next();
        }

        return resp.render(`${req.clout.cloutWebpack.compiler.outputPath}/index.html`);
    }
};
