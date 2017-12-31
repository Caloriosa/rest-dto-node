const { Device, typedefs } = require("../../../src/index.js")
const test = require("ava").test

test("Device DTO read", t => {
  var device = new Device({
    _id: "1dc3d11027852c281cd3abf1",
    _created: "2017-12-02 22:50 UTC",
    title: "My Awesome Device",
    name: "kA54tR0Vw0c",
    description: "Weather in Prague-Smíchov",
    location: "Prague",
    featuredSensor: null,
    tags: ["Prague", "Weather", "Home"],
    user: "5a23d11025a09c281cd3ca13"
  })
  t.is(device.name, "kA54tR0Vw0c")
  t.is(device.title, "My Awesome Device")
  t.is(device.description, "Weather in Prague-Smíchov")
  t.is(device.location, "Prague")
  t.is(device.featuredSensor, null)
  t.deepEqual(device.tags, ["Prague", "Weather", "Home"])
  t.is(device.user, "5a23d11025a09c281cd3ca13")
})

test("Create device DTO", t => {
  var device = new Device()
  device.title = "MyDevice"
  device.description = "Ellenky device"
  device.location = "Prague"
  device.tags = ["Personal", "Home"]

  t.is(device.title, "MyDevice")
  t.is(device.description, "Ellenky device")
  t.is(device.location, "Prague")
  t.deepEqual(device.tags, ["Personal", "Home"])
  t.is(device.name, null)
  t.is(device.user, null)
})
