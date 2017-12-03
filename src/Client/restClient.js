const NodeRestClientPromise = require('node-rest-client-promise');
const ClientApiError = require("./clientApiError.js");

class RestClient  {
  /**
   * 
   * @param {string} url 
   */
  constructor(url) {
    /**
     * @type {string}
     */
    this.url = url;

    /**
     * @type {NodeRestClientPromise.Client}
     */
    this.inner = NodeRestClientPromise.Client();
  }

  get(path, args) {
    return this.handle(() => {
      return this.inner.getPromise(this.url + path, args);
    });
  }

  async handle(restCallback) {
    try {
      var { data, response } = await restCallback();
      if (!data.status) {
       return new Error("HTTP " + response.statusCode + " - " + response.statusMessage);
      }
      if (response.statusCode !== 200) {
        var apiError = new ClientApiError(data.status.message, data.status.code, response.statusCode);
        apiError.content = data.content || null;
      }
      if (!data.content) {
        return new Error("No content data!");
      }
      return data.content;
    } catch (e) {
      return e;
    }
  }
}

module.exports = RestClient;