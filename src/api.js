const axios = require('axios');

let apis = {};

function createCloutApi({path, methods, params}) {
    let defaultMethods = methods[0];

    return (data, method = defaultMethods) => {
        return axios[method](`/api/${path}`, data)
            .then((response) => response.data);
    }
}

Object.keys(cloutApiMap).forEach((key) => {
    let routes = cloutApiMap[key];
    apis[key] = {};

    Object.keys(routes).forEach((name) => {
        apis[key][name] = createCloutApi(cloutApiMap[key][name]);
    });
});

module.exports = apis;

