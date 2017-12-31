const { Endpoint } = require("../../../src/index.js")
const test = require("ava").test

test("Test endpoint basic", t => {
  var endpoint = new Endpoint("/users/${id}/devices/${device_name}", {id: 10, device_name: "mine"})
  t.is(endpoint.path, "/users/${id}/devices/${device_name}")
  t.deepEqual(endpoint.pathArgs, {id: 10, device_name: "mine"})
  t.is(endpoint.escapePath(), "/users/10/devices/mine")
})

test("Test endpoint escape url", t => {
  var endpoint = new Endpoint("/articles/${id}/${title}", {id: 2734, title: "Carmilla movie released! & watch it NOW!!!"})
  t.is(endpoint.escapePath(), "/articles/2734/Carmilla movie released! & watch it NOW!!!")
})

test("Test with invalid placeholders", t => {
  var endpoint = new Endpoint("/devices/{$id}/sensors/${sensor_id}/measures/$datetime/${filter/${s}", {id: 10, datetime: 5467651, filter: "my", s: "temp"})
  t.is(endpoint.escapePath(), "/devices/{$id}/sensors/${sensor_id}/measures/$datetime/${filter/temp")
})

test("Test datetime place to escaped path", t => {
  var date = new Date("2017-12-05 18:00")
  var endpoint = new Endpoint("/time/${time}", {time: date})
  t.is(endpoint.escapePath(), "/time/" + date)
})

test("Extend endpoint", t => {
  var endpoint = new Endpoint("/devices/${device}/sensors", {device: "245a2c0df5bb0cd11d"})
  var extended = endpoint.ext("/${uid}", {uid: "abc0123def654a0"})
  t.is(extended.escapePath(), "/devices/245a2c0df5bb0cd11d/sensors/abc0123def654a0")
})

test("Join endpoints", t => {
  var endpoint = new Endpoint("/devices/${device}/sensors", {device: "245a2c0df5bb0cd11d"})
  var extended = endpoint.join(new Endpoint("/${uid}", {uid: "abc0123def654a0"}))
  t.is(extended.escapePath(), "/devices/245a2c0df5bb0cd11d/sensors/abc0123def654a0")
})

test("Merge endpoint", t => {
  var endpoint = new Endpoint("/foo/${foo}", {foo: "abc"})
  var endpoint2 = new Endpoint("/bar/${bar}/baz/${foo}", {bar: "xyz"})
  var merged = endpoint.merge(endpoint2)
  t.is(merged.escapePath(), "/foo/abc/bar/xyz/baz/abc")
})
