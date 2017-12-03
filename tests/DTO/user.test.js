const module = require("../../src/index.js");
const test = require("ava").test;
const User = module.DTO.User;
const UserRole = module.typedefs.UserRole;

test('User DTO read', t => {
	var user = new User({
    uid: 10,
    login: "admin",
    password: "heslo123",
    email: "admin@localhost.dev",
    name: "Natasha Negovanlis",
    createdAt: "2017-12-02 21:57 UTC",
    activated: true,
    role: "admin"
  });
  t.is(10, user.uid);
  t.is(user.login, "admin");
  t.is(user.password, "heslo123");
  t.is(user.email, "admin@localhost.dev");
  t.is(user.name, "Natasha Negovanlis");
  t.deepEqual(user.createdAt, new Date("2017-12-02 21:57 UTC"));
  t.true(user.activated);
  t.is(user.role, UserRole.ADMIN);
  t.true(user.isAdmin());
  t.false(user.isMember());
});

test('Create user DTO', t => {
  var user = new User();
  user.login = "baumaeli";
  user.email = "lovely@elise.io";
  user.password = "ilovenatasha"
  user.name = "Elise Bauman"

  t.is(user.login, "baumaeli");
  t.is(user.email, "lovely@elise.io");
  t.is(user.password, "ilovenatasha");
  t.is(user.name, "Elise Bauman");
  t.deepEqual(user.createdAt, null);
});