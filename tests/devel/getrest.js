const Client = require("../../src/index.js").Client;

var client = new Client();
client.rest.get("/" + process.argv[process.argv.length-1])
.then(console.dir);