const { Client, User, UserService } = require("../../src/index.js");
const config = require("./config.json");

var client = new Client(config.client);
var users = new UserService(client);

var user = new User();
user.login = "carmilla"
user.email = "I@suck.blood"
user.name = "Carmilla Karnstein"
user.password = "ibiteyoucupcake"

users.save(user).then(console.dir);

process.on('unhandledRejection', e => { console.error(e); });