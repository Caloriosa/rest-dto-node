const { Client, UserService } = require("../../src/index.js");
const config = require("./config.json");

var client = new Client(config.client);
var users = new UserService(client);
users.fetchUser("5a29957125a09c4254bc639f").then(console.dir);

process.on('unhandledRejection', e => { console.error(e); });