module.exports = {
	Client: require("./Client/client.js"),
	DTO: {
		AbstractDto: require("./DTO/abstractDto.js"),
		User: require("./DTO/user.js")
	},
	typedefs: require("./typedefs.js")
}
