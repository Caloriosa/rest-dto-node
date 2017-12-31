const { Sensor, typedefs } = require("../../../src/index.js")
const test = require("ava").test

test("Sensor DTO read", t => {
  var sensor = new Sensor({
    _id: "2cc3df5827852c281cd3cf0a",
    _created: "2017-12-02 22:50 UTC",
    alias: "inside",
    device: "1dc3d11027852c281cd3abf1",
    title: "Inside",
    type: "temperature",
    description: "Teplota doma"
  })
  t.is(sensor.device, "1dc3d11027852c281cd3abf1")
  t.is(sensor.title, "Inside")
  t.is(sensor.type, typedefs.SensorTypes.TEMERATURE)
  t.is(sensor.description, "Teplota doma")
})

test("Create device DTO", t => {
  var sensor = new Sensor()
  sensor.title = "Mine"
  sensor.alias = "mine"
  sensor.type = typedefs.SensorTypes.TEMERATURE
  sensor.description = "my device"

  t.is(sensor.title, "Mine")
  t.is(sensor.alias, "mine")
  t.is(sensor.type, typedefs.SensorTypes.TEMERATURE)
  t.is(sensor.description, "my device")
})
