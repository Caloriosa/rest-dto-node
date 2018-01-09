const noop = () => {} // eslint-disable-line no-empty-function
const methods = ["get", "post", "delete", "patch", "put"]
const reflectors = [
  "toString", "valueOf", "inspect", "constructor", "call",
  Symbol.toPrimitive, Symbol.for("util.inspect.custom"), Symbol("util.inspect.custom")
]

if (typeof util !== "undefined") { // eslint-disable-line
  reflectors.push(util.inspect.custom) // eslint-disable-line no-undef
}

function makeRequestFor (client, method, endpoint) {
  switch (method) {
    case "get":
      return (query = null, args = {}) => client.get(endpoint, query, args)
    case "post":
      return (postData, query = null, args = {}) => client.post(endpoint, postData, query, args)
    case "patch":
      return (postData, query = null, args = {}) => client.patch(endpoint, postData, null, args)
    case "delete":
      return (query = null, args = {}) => client.delete(endpoint, query, args)
    default:
      return (args = {}) => client.request(method, endpoint, args)
  }
}

function buildRoute (client) {
  const route = [""]
  const handler = {
    get (target, name) {
      if (reflectors.includes(name)) return () => route.join("/")
      if (methods.includes(name)) {
        return makeRequestFor(client, name, route.join("/"))
      }
      route.push(name.toString())
      return new Proxy(noop, handler)
    },
    apply (target, _, args) {
      route.push(...args.filter(x => x != null).map(x => encodeURIComponent(x))) // eslint-disable-line eqeqeq
      return new Proxy(noop, handler)
    }
  }
  return new Proxy(noop, handler)
}

module.exports = buildRoute
