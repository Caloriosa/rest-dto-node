const { User, typedefs } = require("../../../src/index.js");
const test = require("ava").test;
const UserRoles = typedefs.UserRoles;

test('User DTO read', t => {
	var user = new User({
    _id: "5a23d11025a09c281cd3ca13",
    login: "admin",
    password: "heslo123",
    email: "admin@localhost.dev",
    name: "Natasha Negovanlis",
    _created: "2017-12-02 21:57 UTC",
    activated: true,
    role: "admin"
  });
  t.is("5a23d11025a09c281cd3ca13", user.uid);
  t.is(user.login, "admin");
  t.is(user.password, "heslo123");
  t.is(user.email, "admin@localhost.dev");
  t.is(user.name, "Natasha Negovanlis");
  t.deepEqual(user.createdAt, new Date("2017-12-02 21:57 UTC"));
  t.true(user.activated);
  t.is(user.role, UserRoles.ADMIN);
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