const axios = require('axios');
function createCloutApi({path, methods, params}) {
    let defaultMethods = methods[0];

    return (data, method = defaultMethods) => {
        return axios[method](`/api/${path}`, data)
            .then((response) => response.data);
    }
}

export class Clout {
    constructor(opts) {
        this.initializeAPIs(opts.apiMap);
    }

    initializeAPIs(cloutApiMap) {
        this.apis = {};

        if (!cloutApiMap) { return; }

        Object.keys(cloutApiMap).forEach((key) => {
            let routes = cloutApiMap[key];
            this.apis[key] = {};

            Object.keys(routes).forEach((name) => {
                this.apis[key][name] = createCloutApi(cloutApiMap[key][name]);
            });
        });
    }
}

export const clout = new Clout({
    apiMap: cloutApiMap
});

