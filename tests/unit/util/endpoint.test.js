const { Endpoint } = require("../../../src/index.js");
const test = require("ava").test;

test('Test endpoint basic', t => {
    var endpoint = new Endpoint("/users/${id}/devices/${device_name}", {id: 10, device_name: "mine"});
    t.is(endpoint.path, "/users/${id}/devices/${device_name}");
    t.deepEqual(endpoint.pathArgs, {id: 10, device_name: "mine"});
    t.is(endpoint.escapePath(), "/users/10/devices/mine");
});

test('Test endpoint escape url', t => {
    var endpoint = new Endpoint("/articles/${id}/${title}", {id: 2734, title: "Carmilla movie released! & watch it NOW!!!"});
    t.is(endpoint.escapePath(), "/articles/2734/Carmilla movie released! & watch it NOW!!!");
});

test('Test with invalid placeholders', t => {
    var endpoint = new Endpoint("/devices/{$id}/sensors/${sensor_id}/measures/$datetime/${filter/${s}", {id: 10, datetime: 5467651, filter: "my", s: "temp"});
    t.is(endpoint.escapePath(), "/devices/{$id}/sensors/${sensor_id}/measures/$datetime/${filter/temp");
});

test('Test datetime place to escaped path', t => {
    var endpoint = new Endpoint("/time/${time}", {time: new Date(1482565489654)});
    t.is(endpoint.escapePath(), "/time/Sat Dec 24 2016 08:44:49 GMT+0100 (CET)");
});