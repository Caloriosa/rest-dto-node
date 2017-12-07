const { Mapper, User, typedefs } = require("../../../src/index.js");
const test = require("ava").test;
const mocks = require("../mocks.js");

test('Entity mapping', t => {
    var mapper = new Mapper(User);
    var userDtoData = mocks.mockUserDtoData();
    var user = mapper.mapEntity(userDtoData);
    t.is(user.constructor.name, "User");
    t.is(user.login, "admin");
    t.is(user.name, "Natasha Negovanlis");
    t.true(user.isAdmin());
});

test('Array mapping', t => {
    var mapper = new Mapper(User);
    var userDtoDataArray = mocks.mockUserDtoDataArray();
    var users = mapper.mapArray(userDtoDataArray);
    t.is(users.length, 3);
    
    var user1 = users[0];
    t.is(user1.constructor.name, "User");
    t.is(user1.login, "admin");
    t.is(user1.name, "Natasha Negovanlis");
    
    var user2 = users[1];
    t.is(user2.constructor.name, "User");
    t.is(user2.login, "vampire");
    t.is(user2.name, "Dracula");
});

test('Collection mapping', t => {
    var mapper = new Mapper(User);
    var userDtoDataArray = mocks.mockUserDtoDataArray();
    var users = mapper.mapCollection(userDtoDataArray);
    t.is(users.constructor.name, "Collection");
    t.is(users.size, 3);
    t.is(users.firstKey(), "5a23d11025a09c281cd3ca13");
    
    var user1 = users.first();
    t.is(user1.constructor.name, "User");
    t.is(user1.login, "admin");
    t.is(user1.name, "Natasha Negovanlis");
    
    var user2 = users.get("6c73d11586a09ert1cd3ca13");
    t.is(user2.constructor.name, "User");
    t.is(user2.login, "vampire");
    t.is(user2.name, "Dracula");

    var user3 = users.find("login", "monkey")
    t.is(user3.constructor.name, "User");
    t.is(user3.login, "monkey");
    t.is(user3.name, "Donkey Kong");
});

test('MetaInfo mapping', t =>{
    var mapper = new Mapper(User);
    var meta = mocks.mockRestMeta(mocks.mockStatus(typedefs.ApiStatuses.BUSY, "System is busy!"));
    var metaInfo = mapper.mapMeta(meta);
    t.is(metaInfo.statusCode, typedefs.ApiStatuses.BUSY);
    t.is(metaInfo.statusMessage, "System is busy!");
});

//TODO: write tests for mapping entity collection and array with MetaInfo
//TODO: write map empty and null DtoData to entities, collection and array (with MetaInfo)