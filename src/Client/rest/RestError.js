/**
 * @class
 * @extends {Error}
 */
class RestError extends Error {
    constructor(message, response) {
        super(message);
        /**
         * @type {Response}
         */
        this.response = response;
    }
};

module.exports = RestError;