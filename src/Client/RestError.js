/**
 * @class
 * @extends {Error}
 */
class RestError extends Error {
    constructor(message, response) {
        super(message);
        /**
         * @type {Object}
         */
        this.httpStatus = { code: response.statusCode, message: response.statusMessage }
        this.url = response.responseUrl;
        this.headers = response.headers;
    }
};

module.exports = RestError;