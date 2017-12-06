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
     * Caloriosa rest service status code
     * @type {ApiStatus}
     * @readonly
     */
    get statusCode() {
        return this._status.code || null;
    }

    /**
     * Caloriosa rest service status message
     * @type {string}
     */
    get statusMessage() {
        return this._status.message || null;
    }

    /**
     * Caloriosa rest service HTTP status code number
     * Eg: (200, 201, 404, 500, etc)
     * @type {number}
     * @readonly
     */
    get statusCodeNumber() {
        return this._httpStatusCode;
    }

    /**
     * Total count of pages.
     * <warn>Returns null if paging unvailable!</warn>
     * @type {?number}
     * @readonly
     */
    get totalPages() {
        return this._httpHeaders["pagination-count"] || null;
    }

    /**
     * Items showed per page(listing). 
     * <warn>Returns null if paging unvailable!</warn>
     * @type {?number}
     * @readonly
     */
    get itemsPerPage() {
        return this._httpHeaders["pagination-page"] || null;
    }

    /**
     * Current showed page. 
     * <warn>Returns null if paging unvailable!</warn>
     * @type {?number}
     * @readonly
     */
    get currentPage() {
        return this._httpHeaders["pagination-page"] || null;
    }

    /**
     * Total count of items on service (listing)
     * <warn>Returns null if paging unvailable!</warn>
     * @type {?number}
     * @readonly
     */
    get totalItemsCount() {
        return this._httpHeaders["items-count"] || null;
    }

    /**
     * Caloriosa server version
     * @type {string}
     * @readonly
     */
    get serverVersion() {
        return this._httpHeaders["caloriosa-version"] || "unknown";
    }
}

module.exports = MetaInfo;