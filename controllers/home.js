module.exports = {
    path: '/',
    fn(req, resp) {
        if (!this.cloutWebpack) {
            return resp.send('Please wait, compiling...');
        }
        return resp.render(`${this.cloutWebpack.compiler.outputPath}/index.html`);
    }
};
