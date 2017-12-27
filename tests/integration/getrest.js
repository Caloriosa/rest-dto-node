const Client = require("../../src/index.js").Client;

var client = new Client({
    url: "https://search.seznam.cz"
});
client.get(process.argv[process.argv.length - 1])
.then( response => console.dir(response.data));

process.on('unhandledRejection', e => { console.error(e); });