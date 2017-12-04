const Client = require("../../src/index.js").Client;

var client = new Client();
client.authenticate("natvanlis", "carmilla");

process.on('unhandledRejection', e => { console.error(e); });