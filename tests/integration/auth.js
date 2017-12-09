const { Client, AuthService, AuthInfo } = require("../../src/index.js");

var client = new Client();
var authSvc = new AuthService(client);

authSvc.authenticate("carmilla", "ibiteyoucupcake").then(authInfo => { 
  console.dir(authInfo)
  console.log("\n--------------------------------");
  console.log("Token: " + authInfo.token);
  console.log("ExpireAt: " + authInfo.expireAt);
  console.log("Type: " + authInfo.type);
  console.log("IdentityID: " + authInfo.identityId);
});

process.on('unhandledRejection', e => { console.error(e); });