const { Client, User } = require("../../src/index.js");
const config = require("./config.json");

var client = new Client(config.client);

var user = client.users.createUserEntity();
user.login = "baumanelise"
user.email = "tiny@gay.laura"
user.name = "Elise Bauman"
user.password = "ibittenbyvampire"

client.users.save(user).then(console.dir);

process.on('unhandledRejection', console.error);