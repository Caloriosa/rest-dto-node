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
        this._httpStatusCode = response.statusCode;
        this._httpStatusMessage = response.statusMessage;
        this._httpHeaders = response.headers;
    }

    /**
     * @type {ApiStatus}
     * @readonly
     */
    get statusCode() {
        return this._status.code || null;
    }

    /**
     * @type {string}
     */
    get statusMessage() {
        return this._status.message || null;
    }

    /**
     * @type {number}
     * @readonly
     */
    get httpStatusCode() {
        return this._httpStatusCode;
    }

    /**
     * @type {string}
     * @readonly
     */
    get httpStatusMessage() {
        return this._httpStatusMessage;
    }

    /**
     * @type {Object<string,Object>}
     * @readonly
     */
    get httpHeaders() {
        return this._httpHeaders;
    }

    /**
     * @type {number}
     * @readonly
     */
    get totalPages() {
        return this._httpHeaders["pagination-count"] || null;
    }

    /**
     * @type {number}
     * @readonly
     */
    get itemsPerPage() {
        return this._httpHeaders["pagination-page"] || null;
    }

    /**
     * @type {number}
     * @readonly
     */
    get currentPage() {
        return this._httpHeaders["pagination-page"] || null;
    }

    /**
     * @type {number}
     * @readonly
     */
    get totalItemsCount() {
        return this._httpHeaders["items-count"] || null;
    }

    /**
     * @type {number}
     * @readonly
     */
    get serverVersion() {
        return this._httpHeaders["caloriosa-version"] || null;
    }
}

module.exports = MetaInfo;