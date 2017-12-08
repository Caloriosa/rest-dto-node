/**
 * @class
 */
class MetaInfo {
    /**
     * 
     * @param {StatusData} status 
     * @param {Response} response 
     */
    constructor (status, response) {
        if (!status) {
            throw new ReferenceError("Status cant't be null or undefined!");
        }
        if (!response) {
            throw new ReferenceError("Response can't be null or undefined!");
        }
        /**
         * @private
         */
        this._status = status;
        this._httpStatusCode = response.statusCode;
        this._httpHeaders = response.headers;
    }

    /**
     * Caloriosa rest service status code
     * @type {?ApiStatus}
     * @readonly
     */
    get statusCode() {
        return this._status.code || null;
    }

    /**
     * Caloriosa rest service status message
     * @type {?string}
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
        return  this._httpHeaders["pagination-per-page"] || null;
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
        return this._httpHeaders["items-total-count"] || null;
    }

    /**
     * Caloriosa server version
     * @type {string}
     * @readonly
     */
    get serverVersion() {
        return this._httpHeaders["caloriosa-version"] || "unknown";
    }

    /**
     * @type {*}
     */
    get headers() {
        return this._httpHeaders;
    }

    /**
     * @type {StatusData}
     */
    get status() {
        return this._status;
    }
}

module.exports = MetaInfo;