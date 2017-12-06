/**
 * @class
 */
class MetaInfo {
    /**
     * 
     * @param {*} status 
     * @param {Response} response 
     */
    constructor (status, response) {
        /**
         * @private
         */
        this._status = status;
        this._httpStatusCode = response.httpStatus;
        this._httpStatusMessage = response.httpMessage;
    }

    get statusCode() {
        return this._status.code || null;
    }

    get statusMessage() {
        return this._status.message || null;
    }

    get httpStatusCode() {
        return this._httpStatusCode;
    }

    get httpStatusMessage() {
        return this._httpStatusMessage;
    }
}

module.exports = MetaInfo;