const { Client, UserManager } = require("../src/index.js");

exports.mockClient = function() {
    return new Client();
}

exports.mockUser = function(data = {}) {
    let client = new Client();
    let userManager = new UserManager(client);
    return userManager.createUserEntity(data);
}