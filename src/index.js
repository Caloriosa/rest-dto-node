module.exports = {
	Client: require("./Client/client.js"),
	ClientApiError: require("./Client/clientApiError.js"),
	RestClient: require("./Client/restClient.js"),
	DTO: {
		AbstractDto: require("./DTO/abstractDto.js"),
		User: require("./DTO/user.js")
	},
	Store: {
		AbstractStore: require("./Store/abstractStore.js"),
		UserStore: require("./Store/userStore.js")
	},
	typedefs: require("./typedefs.js")
}
