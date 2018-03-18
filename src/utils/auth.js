import { apis } from './clout';

let localStorage = global.window.localStorage;

/**
 * Authentication lib
 * @type {Object}
 */
export const utils = {
    /**
     * Logs a user in
     * @param  {string}   email The email of the user
     * @param  {string}   password The password of the user
     * @returns {Promise} return the user object
     */
    login(email, password) {
        return this.isLoggedIn()
            .catch(() => {
                apis.user.login({ email, password }, (response) => {
                    console.log(response);

                    // localStorage.token = response.token;
                    return Promise.reject('not implimented this');
                });
            });
    },
    /**
     * Logs the current user out
     * @returns {Promise}
     */
    logout() {
        return apis.user.logout()
            .then(() => localStorage.removeItem('token'));
    },
    /**
     * Checks if anybody is logged in
     * @return {promise} returns user object if logged in
     */
    isLoggedIn() {
        if (!this.isLocallyLoggedIn()) {
            return Promise.reject();
        }

        return apis.user.whoami()
            .then((response) => response.data.data);
    },
    /**
     * Check if locally logged in
     * @return boolean
     */
    isLocallyLoggedIn() {
        return !!localStorage.token;
    },
    /**
     * Registers a user in the system
     * @param  {string}   email The email of the user
     * @param  {string}   password The password of the user
     * @param  {Response} returns when registered
     */
    register(email, password, callback) {
        // Post a fake request
        return apis.user.register({ email, password })
            .then((response) => response.data.data);
    }
};

export default utils;
