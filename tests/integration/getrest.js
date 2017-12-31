const Client = require("../../src/index.js").Client

var client = new Client({
  url: "https://jsonplaceholder.typicode.com"
})
client.get(process.argv[process.argv.length - 1])
  .then(response => console.dir(response.data))

process.on("unhandledRejection", e => { console.error(e) })
