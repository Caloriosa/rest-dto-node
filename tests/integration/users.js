const Client = require("../../src/index.js").Client;
const config = require("./config.json");

var client = new Client(config.client);

client.users.fetchUsers().then(console.dir);

process.on('unhandledRejection', e => { console.error(e); });