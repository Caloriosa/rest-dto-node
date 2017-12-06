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
        this._httpHeaders = response.getHeaders();
    }

    /**
     * @type {}
     */
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

    get totalPages() {
        return this._httpHeaders["pagination-count"] || null;
    }

    get itemsPerPage() {
        return this._httpHeaders["pagination-page"] || null;
    }

    get currentPage() {
        return this._httpHeaders["pagination-page"] || null;
    }

    get totalItemsCount() {
        return this._httpHeaders["items-count"] || null;
    }

    get serverVersion() {
        return this._httpHeaders["caloriosa-version"] || null;
    }
}

module.exports = MetaInfo;