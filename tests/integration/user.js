const Caloriosa = require("../../src/index.js");
const config = require("./config.json");

var caloriosa = Caloriosa.createApiClient(config.client);
//caloriosa.users.fetchUser("5a29957125a09c4254bc639f").then(console.dir);
caloriosa.users.fetchUserByLogin("Ashleynka").then(console.dir);

process.on('unhandledRejection', e => { console.error(e.stack); });