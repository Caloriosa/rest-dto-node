const { createApiClient, User } = require("../../src/index.js");
const config = require("./config.json");

var caloriosa = createApiClient(config.client);
caloriosa.token = "aasdasdd"
var user = new User();
user.login = "carmilla"
user.email = "I@suck.blood"
user.name = "Carmilla Karnstein"
user.password = "ibiteyoucupcake"

caloriosa.users.setUser(user).then(console.dir);

process.on('unhandledRejection', e => { console.error(e.stack); });