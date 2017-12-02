const test = require("ava").test;
const User = require("../../index.js").DTO.User;

test('User DTO', t => {
	var user = new User({
    uid: 10,
    login: "admin",
    password: "heslo123",
    email: "admin@localhost.dev",
    name: "Natasha Negovanlis",
    createdAt: "2017-12-02 21:57 UTC",
    activated: true
  });
  t.is(10, user.uid);
  t.is(user.login, "admin");
  t.is(user.password, "heslo123");
  t.is(user.email, "admin@localhost.dev");
  t.is(user.name, "Natasha Negovanlis");
  t.is(user.createdAt, "2017-12-02 21:57 UTC");
  t.true(user.activated);
});